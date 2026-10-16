/**
 * /robots.txt: every crawler may crawl the site, except the Strapi admin,
 * the raw CMS API, the contact form endpoint and the post-form thank-you
 * page. /uploads (images) and /_next (scripts, styles) stay allowed so
 * pages can be rendered and images indexed.
 *
 * AI and social crawlers are also welcomed by name. A crawler follows only
 * the most specific group that names it, so each named group repeats the
 * private routes.
 */
const SITE_URL = (process.env.SITE_URL || 'https://www.roimantra.com').replace(/\/+$/, '');

const PRIVATE_ROUTES = ['/admin', '/api/', '/contact/submit', '/thank-you'];

const NAMED_CRAWLERS = [
    'ChatGPT-User',
    'GPTBot',
    'OpenAI-User',
    'ClaudeBot',
    'facebookexternalhit',
    'MetaAI',
    'PerplexityBot',
    'Google-Extended',
    'Bingbot',
    'CCBot',
];

export default function robots() {
    return {
        rules: [
            { userAgent: '*', allow: '/', disallow: PRIVATE_ROUTES },
            ...NAMED_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: PRIVATE_ROUTES })),
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
