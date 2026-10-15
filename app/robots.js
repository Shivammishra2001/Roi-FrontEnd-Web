/**
 * /robots.txt: every crawler may crawl the site, except the Strapi admin,
 * the raw CMS API, the contact form endpoint and the post-form thank-you
 * page. /uploads (images) and /_next (scripts, styles) stay allowed so
 * pages can be rendered and images indexed.
 */
const SITE_URL = (process.env.SITE_URL || 'https://www.roimantra.com').replace(/\/+$/, '');

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/api/', '/contact/submit', '/thank-you'],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
