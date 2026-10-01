// Strapi media (/uploads/x.jpg) and the browser's same-origin API calls
// (/api/contact-submissions) are root-relative. In production Nginx routes
// both to Strapi before Next.js sees them; in local dev these rewrites proxy
// them, so the same URLs work everywhere.
const STRAPI_URL = (
    process.env.STRAPI_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    'http://103.25.128.182'
).replace(/\/+$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'images.squarespace-cdn.com',
            },
        ],
    },
    async rewrites() {
        return [
            { source: '/uploads/:path*', destination: `${STRAPI_URL}/uploads/:path*` },
            { source: '/api/:path*', destination: `${STRAPI_URL}/api/:path*` },
        ];
    },
};

module.exports = nextConfig;
