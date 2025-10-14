import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
