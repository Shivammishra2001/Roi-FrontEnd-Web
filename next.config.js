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
    // Strapi returns media as root-relative /uploads/... URLs. In production
    // Nginx routes /uploads/* straight to Strapi; this rewrite does the same
    // when Next.js is reached directly (local dev, and next/image fetching
    // its own source images server-side).
    async rewrites() {
        const strapiUrl = (process.env.STRAPI_URL || 'http://localhost:1338').replace(/\/$/, '');
        return [{ source: '/uploads/:path*', destination: `${strapiUrl}/uploads/:path*` }];
    },
};

module.exports = nextConfig;
