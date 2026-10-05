import { NextResponse } from 'next/server';

/**
 * CMS-managed URL redirects (Strapi → Redirects). Next 16's `proxy` file
 * convention (formerly `middleware`), running on the Node.js runtime.
 *
 * Fail-safe by design: the rules are held in memory and refreshed in the
 * background, so a request never waits on Strapi once the first load is
 * done. If Strapi is slow, down or returns nothing, the request simply
 * continues (NextResponse.next()) — a redirect is never worth a broken page.
 */

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  'http://localhost:1338'
).replace(/\/+$/, '');

const CACHE_TTL_MS = 60_000; // CMS edits go live within a minute
const RETRY_AFTER_ERROR_MS = 15_000; // don't hammer a Strapi that is down
const FETCH_TIMEOUT_MS = 1_500; // worst-case added latency, first load only
const PAGE_SIZE = 100; // Strapi's rest.maxLimit
const MAX_PAGES = 20;

let rules = null; // Map<normalized source, { destination, isPermanent }>
let nextRefreshAt = 0;
let inflight = null;

/** "/Old-Page/" → "/old-page"; "/" stays "/". */
function normalizePath(path) {
  let p = String(path || '').trim().split(/[?#]/)[0];
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.replace(/\/+$/, '');
  try {
    p = decodeURIComponent(p);
  } catch {
    // malformed %-escape: match on the raw path
  }
  return (p || '/').toLowerCase();
}

async function fetchPage(page) {
  const url =
    `${STRAPI_URL}/api/redirects?filters[isActive][$eq]=true` +
    `&fields[0]=source&fields[1]=destination&fields[2]=isPermanent` +
    `&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`;
  const res = await fetch(url, {
    cache: 'no-store',
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Strapi redirects returned ${res.status}`);
  return res.json();
}

async function loadRules() {
  const first = await fetchPage(1);
  const pageCount = Math.min(first?.meta?.pagination?.pageCount || 1, MAX_PAGES);
  const rest = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, i) => fetchPage(i + 2))
  );

  const map = new Map();
  for (const body of [first, ...rest]) {
    for (const item of body?.data || []) {
      const source = item?.source;
      const destination = typeof item?.destination === 'string' ? item.destination.trim() : '';
      if (!source || !destination) continue;
      map.set(normalizePath(source), { destination, isPermanent: item.isPermanent !== false });
    }
  }
  return map;
}

function refresh() {
  if (!inflight) {
    inflight = loadRules()
      .then((map) => {
        rules = map;
        nextRefreshAt = Date.now() + CACHE_TTL_MS;
      })
      .catch(() => {
        // Keep the last good rules (if any) and retry a little later.
        nextRefreshAt = Date.now() + RETRY_AFTER_ERROR_MS;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

async function getRules() {
  if (Date.now() >= nextRefreshAt) {
    const pending = refresh();
    // Only the very first load waits (bounded by FETCH_TIMEOUT_MS); after
    // that, stale rules are served while the refresh runs in the background.
    if (!rules) await pending;
  }
  return rules;
}

export async function proxy(request) {
  try {
    const map = await getRules();
    if (!map || map.size === 0) return NextResponse.next();

    const { pathname, search } = request.nextUrl;
    const rule = map.get(normalizePath(pathname));
    if (!rule) return NextResponse.next();

    const target = new URL(rule.destination, request.url);
    // Never redirect a page to itself (would loop forever).
    if (target.origin === request.nextUrl.origin && normalizePath(target.pathname) === normalizePath(pathname)) {
      return NextResponse.next();
    }
    // Carry the visitor's query string (UTMs etc.) unless the rule sets its own.
    if (!target.search && search) target.search = search;

    return NextResponse.redirect(target, { status: rule.isPermanent ? 308 : 307 });
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  // Skip Next.js assets and everything Strapi serves (/api, /admin, /uploads).
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|(?:api|admin|uploads)(?:/|$)).*)'],
};
