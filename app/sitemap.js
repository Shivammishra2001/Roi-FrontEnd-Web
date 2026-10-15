import { getSitemapEntries } from '../lib/strapi';

/**
 * /sitemap.xml, built from Strapi on every request so a page or post that is
 * published, unpublished or switched off shows up (or drops out) right away.
 * Pages switched off in Strapi ("Page Live" / "Show on Website") are left out.
 */
export const dynamic = 'force-dynamic';

const SITE_URL = (process.env.SITE_URL || 'https://www.roimantra.com').replace(/\/+$/, '');

/** Pages-collection slug -> site path, with its sitemap priority and change frequency. */
const PAGE_ROUTES = {
    home: { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    'about-us': { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    blog: { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
    'case-studies': { path: '/case-studies', priority: 0.9, changeFrequency: 'weekly' },
    contact: { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    discovery: { path: '/discovery', priority: 0.8, changeFrequency: 'monthly' },
    'privacy-policy': { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    'terms-and-conditions': { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' },
};

// Shown when Strapi can't be reached, so the sitemap never comes back empty.
const CORE_PAGES = ['home', 'about-us', 'blog', 'case-studies', 'contact', 'privacy-policy', 'terms-and-conditions'];

const date = (value) => {
    const d = value ? new Date(value) : null;
    return d && !Number.isNaN(d.getTime()) ? d : undefined;
};

/** The newer of two dates (a listing page changes whenever one of its items does). */
const latest = (...dates) => dates.filter(Boolean).sort((a, b) => b - a)[0];

export default async function sitemap() {
    const [pages, posts, caseStudies] = await Promise.all([
        getSitemapEntries('pages'),
        getSitemapEntries('blog-posts'),
        getSitemapEntries('case-studies'),
    ]);

    const newest = (items) => latest(...(items || []).map((i) => date(i.updatedAt)));
    const listingUpdate = { blog: newest(posts), 'case-studies': newest(caseStudies) };

    const pageEntries = (pages || CORE_PAGES.map((slug) => ({ slug, updatedAt: null })))
        .filter((p) => PAGE_ROUTES[p.slug]) // only slugs that have a route on the site
        .map((p) => {
            const route = PAGE_ROUTES[p.slug];
            return {
                url: `${SITE_URL}${route.path}`,
                lastModified: latest(date(p.updatedAt), listingUpdate[p.slug]),
                changeFrequency: route.changeFrequency,
                priority: route.priority,
            };
        })
        .sort((a, b) => b.priority - a.priority);

    const detailEntries = (items, base) =>
        (items || []).map((item) => ({
            url: `${SITE_URL}${base}/${encodeURIComponent(item.slug)}`,
            lastModified: date(item.updatedAt),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));

    return [...pageEntries, ...detailEntries(posts, '/blog'), ...detailEntries(caseStudies, '/case-studies')];
}
