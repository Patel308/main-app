import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/web-development', destination: '/services/web-dev', permanent: true },
      { source: '/mobile-development', destination: '/services/app-dev', permanent: true },
      { source: '/it-services', destination: '/services', permanent: true },
      { source: '/project', destination: '/portfolio', permanent: true },
      { source: '/blog', destination: '/resources', permanent: true },
      { source: '/blog-single', destination: '/resources', permanent: true },
      { source: '/about', destination: '/team', permanent: true },
      { source: '/why-choose-us', destination: '/', permanent: true },
      { source: '/digital-marketing', destination: '/services/digital-marketing', permanent: true },
    ];
  },
};

export default nextConfig;