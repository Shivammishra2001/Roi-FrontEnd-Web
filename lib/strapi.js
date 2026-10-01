// Server-side Strapi client. Used only from server components (app/layout.js,
// app/page.js); client components receive the data as props.

// Server-side fetches prefer the internal address (no Nginx hop on the host).
const STRAPI_URL = (
    process.env.STRAPI_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    'http://103.25.128.182'
).replace(/\/+$/, '');

// Seconds before a page is regenerated with fresh CMS content (ISR).
export const CMS_REVALIDATE = 60;

async function getJson(path) {
    try {
        const res = await fetch(`${STRAPI_URL}${path}`, {
            next: { revalidate: CMS_REVALIDATE },
            // Don't let `next build` or a request hang on an unreachable CMS.
            signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json?.data ?? null;
    } catch (err) {
        // Components render their built-in fallback copy on null.
        console.error(`[strapi] GET ${path} failed: ${err.message}`);
        return null;
    }
}

// { seo, global: { navbar, footer, loader }, sections[] }
export function getHomePage() {
    return getJson('/api/home-page/full');
}

// { navbar, footer, loader, defaultSeo } — shared by every page.
export function getGlobal() {
    return getJson('/api/global/full');
}
