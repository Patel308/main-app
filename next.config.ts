import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async redirects() {
    return [
      // ═══════════════════════════════════════════════════════════
      // Service Pages (Old Vite Routes)
      // ═══════════════════════════════════════════════════════════
      { source: '/web-development',    destination: '/services/web-dev',             permanent: true },
      { source: '/mobile-development', destination: '/services/app-dev',             permanent: true },
      { source: '/it-services',        destination: '/services',                     permanent: true },
      
      // ═══════════════════════════════════════════════════════════
      // Old HTML File Redirects (From Vite Migration) - 404 Cleanup
      // ═══════════════════════════════════════════════════════════
      { source: '/mobile-development.html', destination: '/services/app-dev',       permanent: true },
      { source: '/index-7.html',            destination: '/',                        permanent: true },
      { source: '/about-us.html',           destination: '/about',                   permanent: true },
      
      // ═══════════════════════════════════════════════════════════
      // Other Old Routes
      // ═══════════════════════════════════════════════════════════
      { source: '/project',            destination: '/portfolio',                    permanent: true },
      { source: '/blog-single',        destination: '/blog',                         permanent: true },
      { source: '/why-choose-us',      destination: '/',                             permanent: true },
      { source: '/digital-marketing',  destination: '/services/digital-marketing',   permanent: true },
      { source: '/resources',          destination: '/blog',                         permanent: true },
      { source: '/resources/:path*',   destination: '/blog/:path*',                  permanent: true },
      
      // ═══════════════════════════════════════════════════════════
      // Catch-all for other old HTML files with pattern
      // Redirects any index-X.html to home
      // ═══════════════════════════════════════════════════════════
      { source: '/index-:num.html',    destination: '/',                            permanent: true },
    ];
  },
};

export default nextConfig;