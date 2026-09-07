/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Required alongside the localhost remotePattern below: Next's image
        // optimizer refuses to fetch from any hostname that resolves to a
        // private/loopback IP (SSRF guard) unless this is set. Our Strapi CMS
        // is local in dev — drop this once media is served from a public domain.
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'images.squarespace-cdn.com',
            },
            {
                // Strapi CMS media (dev). Add your production Strapi domain here too
                // once it exists, e.g. { protocol: 'https', hostname: 'cms.example.com' }.
                protocol: 'http',
                hostname: 'localhost',
                port: '1338',
            },
        ],
    },
};

module.exports = nextConfig;
