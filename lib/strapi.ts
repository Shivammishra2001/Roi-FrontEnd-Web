import type { Metadata } from 'next';
import type { ContactPageData, HomePageFull, PageData, Seo } from '../types/strapi';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1338';

/**
 * Fetches the flattened Home page payload from Strapi (`GET /api/home-page/full`).
 * Throws a descriptive Error on any non-200 response instead of silently
 * falling back to hardcoded content — a silent fallback would hide a
 * broken, unseeded, or unreachable CMS instead of surfacing it.
 */
export async function getHomePageData(): Promise<HomePageFull> {
  const endpoint = `${STRAPI_URL}/api/home-page/full`;

  const res = await fetch(endpoint, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(
      `getHomePageData(): Strapi returned ${res.status} ${res.statusText} for ${endpoint}. ` +
        'Check that the Strapi server is running, STRAPI_URL is set correctly, and the ' +
        'home-page entry is published.'
    );
  }

  const json = (await res.json()) as { data: HomePageFull };
  return json.data;
}

/**
 * Fetches the Contact page payload from Strapi (`GET /api/contact-page`).
 * Returned as-is (Strapi's raw shape) — this content type has no media or
 * relations that need flattening, unlike home-page's `/full` endpoint.
 * Throws on any non-200 response for the same reason as getHomePageData:
 * a silent fallback would hide a broken/unseeded/unreachable CMS.
 */
export async function getContactPageData(): Promise<ContactPageData> {
  const endpoint = `${STRAPI_URL}/api/contact-page`;

  const res = await fetch(endpoint, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(
      `getContactPageData(): Strapi returned ${res.status} ${res.statusText} for ${endpoint}. ` +
        'Check that the Strapi server is running, STRAPI_URL is set correctly, and the ' +
        'contact-page entry is published.'
    );
  }

  const json = (await res.json()) as { data: ContactPageData };
  return json.data;
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

/**
 * Fetches one entry from Strapi's unified Pages collection by slug
 * (`GET /api/pages/slug/:slug`) — Home, About Us, and Contact all live here
 * now instead of one Single Type each. Same flattening as getHomePageData
 * (sections/media/links), plus Contact's fields passed through as-is.
 * Throws on any non-200 response for the same reason as the others above.
 */
export async function getPageBySlug(slug: string): Promise<PageData> {
  const endpoint = `${STRAPI_URL}/api/pages/slug/${slug}`;

  const res = await fetch(endpoint, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(
      `getPageBySlug("${slug}"): Strapi returned ${res.status} ${res.statusText} for ${endpoint}. ` +
        'Check that the Strapi server is running, STRAPI_URL is set correctly, and a page with ' +
        `slug "${slug}" is published.`
    );
  }

  const json = (await res.json()) as { data: PageData };
  return json.data;
}
