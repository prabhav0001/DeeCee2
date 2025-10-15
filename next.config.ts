import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression
  compress: true,

  // Optimize images
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Performance optimizations
  swcMinify: true,

  async rewrites() {
    // SPA-style client routes handled in app/page.tsx via History API
    // Ensure direct refreshes on these paths serve the root page
    return [
      { source: "/shop", destination: "/" },
      { source: "/shop/women", destination: "/" },
      { source: "/shop/men", destination: "/" },
      { source: "/product/:id", destination: "/" },
      { source: "/cart", destination: "/" },
      { source: "/contact", destination: "/" },
      { source: "/appointment", destination: "/" },
      { source: "/terms", destination: "/" },
      { source: "/privacy", destination: "/" },
      { source: "/about", destination: "/" },
      { source: "/profile", destination: "/" },
      { source: "/bestsellers", destination: "/" },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
