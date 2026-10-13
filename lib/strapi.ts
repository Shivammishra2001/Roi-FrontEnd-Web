import type { Metadata } from 'next';
import type {
  BlogDetailSettings,
  BlogPostDetail,
  CaseStudyDetail,
  CaseStudyDetailSettings,
  Global,
  PageData,
  Seo,
} from '../types/strapi';

const STRAPI_URL = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338').replace(/\/+$/, '');

const FALLBACK_GLOBAL: Global = {
  navbar: {
    logoDefault: { url: '/images/logo.png', alt: 'ROI MANTRA', width: 160, height: 25, priority: false },
    logoScrolled: { url: '/images/logo.png', alt: 'ROI MANTRA', width: 160, height: 25, priority: false },
    logoMobile: { url: '/images/logo.png', alt: 'ROI MANTRA', width: 160, height: 25, priority: false },
    ctaLabel: 'Start a conversation',
    ctaHref: '/contact',
    ctaArrowGlyph: '→',
    primaryNavItems: [
      { label: 'Discovery', href: '/discovery', isExternal: false, hasSubmenu: false },
      { label: 'Case Studies', href: '/case-studies', isExternal: false, hasSubmenu: false },
      { label: 'Careers', href: '#', isExternal: false, hasSubmenu: false },
      { label: 'Blog', href: '/blog', isExternal: false, hasSubmenu: false },
      { label: 'Contact', href: '/contact', isExternal: false, hasSubmenu: false },
    ],
    theThinkingSubmenuItems: [],
  },
  footer: {
    footerLogoText: 'ROI MANTRA',
    copyrightText: 'Copyright 2026 ROI Mantra. | All Rights Reserved',
    legalLinks: [],
    reachUsEmailLabel: 'hello@roimantra.com',
    reachUsEmailHref: 'mailto:hello@roimantra.com',
    reachUsLocation1: 'Dallas, TX',
    reachUsLocation2: 'Delhi NCR',
    footerLinkColumns: [],
    socialLinks: [],
  },
  loader: {
    brandText: 'ROI MANTRA',
    progressCounterSuffix: '%',
  },
  defaultSeo: {
    metaTitle: 'ROI Mantra',
    metaDescription: 'ROI Mantra website',
    ogImage: null,
  },
};

/**
 * All site content comes from Strapi, fetched fresh on every request
 * (`no-store`) so an edit published in the admin shows up on the next page
 * load. If Strapi is offline or unreachable, handles gracefully with fallbacks.
 */
const NOT_FOUND = Symbol('strapi-not-found');

async function strapiGet<T>(path: string, opts?: { allow404?: boolean }): Promise<T | null>;
async function strapiGet<T>(path: string, opts: { allow404: true; distinct404: true }): Promise<T | null | typeof NOT_FOUND>;
// `distinct404`: a 404 returns NOT_FOUND instead of null, so callers can tell
// "doesn't exist / switched off" apart from "Strapi unreachable".
async function strapiGet<T>(path: string, { allow404 = false, distinct404 = false } = {}): Promise<T | null | typeof NOT_FOUND> {
  const endpoint = `${STRAPI_URL}${path}`;
  try {
    const res = await fetch(endpoint, { cache: 'no-store' });

    if (allow404 && res.status === 404) return distinct404 ? NOT_FOUND : null;

    if (!res.ok) {
      console.warn(`[strapi] Returned ${res.status} ${res.statusText} for ${endpoint}`);
      return null;
    }

    const json = (await res.json()) as { data: T };
    return json.data;
  } catch (err) {
    console.warn(`[strapi] Connection to ${endpoint} failed:`, err instanceof Error ? err.message : err);
    return null;
  }
}

/** Navbar, footer, intro loader and site-wide default SEO (`GET /api/global/full`). */
export async function getGlobal(): Promise<Global> {
  const data = await strapiGet<Global>('/api/global/full');
  return data ?? FALLBACK_GLOBAL;
}

/**
 * One entry from the Pages collection by slug (`GET /api/pages/slug/:slug`):
 * home, about-us, contact, discovery, blog, case-studies. `sections` is the
 * page's dynamic zone, rendered in order by SectionRenderer.
 *
 * Returns null when the page doesn't exist, isn't published, or has its
 * "Page Live" switch (isActive) off — Strapi 404s all three; callers then
 * render notFound(). If Strapi is unreachable it returns an empty page
 * instead, so an outage never turns the site into 404s.
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  const data = await strapiGet<PageData>(`/api/pages/slug/${encodeURIComponent(slug)}`, { allow404: true, distinct404: true });
  if (data === NOT_FOUND || data?.isActive === false) return null;
  return (
    data ?? {
      title: slug,
      slug,
      isActive: true,
      seo: null,
      sections: [],
      heroBadge: null,
      heroHeading: null,
      heroSubheading: null,
      infoCard: null,
      stats: [],
      nextStepsHeading: null,
      nextSteps: [],
    }
  );
}

/** A published blog post + related posts, or null when the slug doesn't exist. */
export async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  const detail = await strapiGet<BlogPostDetail>(`/api/blog-posts/slug/${encodeURIComponent(slug)}`, { allow404: true });
  // "Show on Website" switched off: treated as not found (Strapi already 404s it; this is a second guard).
  return detail?.post?.isActive === false ? null : detail;
}

/**
 * Every published case study for the /case-studies cards, in List Order
 * (`GET /api/case-studies`, core REST, raw — map with lib/caseStudies.js).
 */
export async function getCaseStudies(): Promise<unknown[]> {
  const query = new URLSearchParams({
    'filters[isActive][$eq]': 'true',
    'sort[0]': 'sortOrder:asc',
    'sort[1]': 'id:asc',
    'pagination[pageSize]': '100',
    'populate[image][populate][0]': 'file',
    'populate[cardMetrics]': 'true',
  });
  return (await strapiGet<unknown[]>(`/api/case-studies?${query}`)) ?? [];
}

/** A published case study + related case studies, or null when the slug doesn't exist. */
export async function getCaseStudy(slug: string): Promise<CaseStudyDetail | null> {
  const detail = await strapiGet<CaseStudyDetail>(`/api/case-studies/slug/${encodeURIComponent(slug)}`, { allow404: true });
  // "Show on Website" switched off: treated as not found (Strapi already 404s it; this is a second guard).
  return detail?.caseStudy?.isActive === false ? null : detail;
}

/**
 * A legal page from Pages (`GET /api/pages/slug/privacy-policy` or
 * `/terms-and-conditions`): the page's title and SEO plus the fields of its
 * "Legal Content" section, in one flat object. Unlike the other fetchers this
 * never throws: the legal pages must always render, so on any failure (or a
 * missing section) it logs and returns null, and the page shows its
 * built-in copy (lib/legal.js). The one exception is a page Strapi has no
 * published version of (unpublished / still a draft): that returns
 * LEGAL_NOT_PUBLISHED, and the route renders a 404 instead.
 */
export const LEGAL_NOT_PUBLISHED = 'not-published';

export async function getLegalPage(
  slug: 'privacy-policy' | 'terms-and-conditions'
): Promise<Record<string, unknown> | typeof LEGAL_NOT_PUBLISHED | null> {
  try {
    const page = await strapiGet<PageData>(`/api/pages/slug/${slug}`, { allow404: true });
    if (page === null) return LEGAL_NOT_PUBLISHED;
    const legal = page.sections?.find((s) => s.__component === 'sections.legal-content');
    if (!legal) return null;
    const { __component, ...fields } = legal as Record<string, unknown>;
    return { ...fields, title: page.title, seo: page.seo };
  } catch (err) {
    console.error(`[strapi] ${slug} unavailable, showing built-in copy:`, err instanceof Error ? err.message : err);
    return null;
  }
}

/** Labels, background video and CTA shared by every /blog/[slug] page. */
export async function getBlogDetailSettings(): Promise<BlogDetailSettings> {
  return (await strapiGet<BlogDetailSettings>('/api/blog-detail-page'))!;
}

/** Labels, background video and CTA shared by every /case-studies/[slug] page. */
export async function getCaseStudyDetailSettings(): Promise<CaseStudyDetailSettings> {
  return (await strapiGet<CaseStudyDetailSettings>('/api/case-study-detail-page'))!;
}

/** Builds a Next.js Metadata object from a Strapi `shared.seo` component. */
export function constructMetadata(seo: Seo | null): Metadata {
  if (!seo) return {};

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    ...(seo.keywords?.trim() ? { keywords: seo.keywords.trim() } : {}),
    ...(seo.ogImage
      ? { openGraph: { images: [{ url: seo.ogImage.url, alt: seo.ogImage.alt }] } }
      : {}),
  };
}
