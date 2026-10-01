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

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1338';

/**
 * All site content comes from Strapi, fetched fresh on every request
 * (`no-store`) so an edit published in the admin shows up on the next page
 * load — no rebuild, no redeploy. Any non-200 throws a descriptive Error
 * instead of silently falling back to hardcoded content, which would hide a
 * broken, unseeded, or unreachable CMS.
 */
async function strapiGet<T>(path: string, { allow404 = false } = {}): Promise<T | null> {
  const endpoint = `${STRAPI_URL}${path}`;
  const res = await fetch(endpoint, { cache: 'no-store' });

  if (allow404 && res.status === 404) return null;

  if (!res.ok) {
    throw new Error(
      `Strapi returned ${res.status} ${res.statusText} for ${endpoint}. ` +
        'Check that the Strapi server is running, STRAPI_URL is set correctly, and the entry is published.'
    );
  }

  const json = (await res.json()) as { data: T };
  return json.data;
}

/** Navbar, footer, intro loader and site-wide default SEO (`GET /api/global/full`). */
export async function getGlobal(): Promise<Global> {
  return (await strapiGet<Global>('/api/global/full'))!;
}

/**
 * One entry from the Pages collection by slug (`GET /api/pages/slug/:slug`):
 * home, about-us, contact, blog, case-studies. `sections` is the page's
 * dynamic zone, rendered in order by SectionRenderer.
 */
export async function getPageBySlug(slug: string): Promise<PageData> {
  return (await strapiGet<PageData>(`/api/pages/slug/${encodeURIComponent(slug)}`))!;
}

/** A published blog post + related posts, or null when the slug doesn't exist. */
export async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  return strapiGet<BlogPostDetail>(`/api/blog-posts/slug/${encodeURIComponent(slug)}`, { allow404: true });
}

/**
 * Every published case study for the /case-studies cards, in List Order
 * (`GET /api/case-studies`, core REST, raw — map with lib/caseStudies.js).
 */
export async function getCaseStudies(): Promise<unknown[]> {
  const query = new URLSearchParams({
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
  return strapiGet<CaseStudyDetail>(`/api/case-studies/slug/${encodeURIComponent(slug)}`, { allow404: true });
}

/**
 * A legal page from Pages (`GET /api/pages/slug/privacy-policy` or
 * `/terms-and-conditions`): the page's title and SEO plus the fields of its
 * "Legal Content" section, in one flat object. Unlike the other fetchers this
 * never throws: the legal pages must always render, so on any failure (or a
 * missing page / section) it logs and returns null, and the page shows its
 * built-in copy (lib/legal.js).
 */
export async function getLegalPage(slug: 'privacy-policy' | 'terms-and-conditions'): Promise<Record<string, unknown> | null> {
  try {
    const page = await strapiGet<PageData>(`/api/pages/slug/${slug}`, { allow404: true });
    const legal = page?.sections?.find((s) => s.__component === 'sections.legal-content');
    if (!page || !legal) return null;
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
    ...(seo.ogImage
      ? { openGraph: { images: [{ url: seo.ogImage.url, alt: seo.ogImage.alt }] } }
      : {}),
  };
}
