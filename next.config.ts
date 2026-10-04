import type { NextConfig } from "next";

type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** Old WordPress / static HTML paths Google still indexes → current App Router routes */
const legacyRedirects: Redirect[] = [
  // WordPress-style categories (e.g. https://www.fiam.com.pk/category/interior)
  {
    source: "/category/interior",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/category/decorative",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/category/decorative-lighting",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/category/outdoor",
    destination: "/categories/outdoor-light",
    permanent: true,
  },
  {
    source: "/category/exterior",
    destination: "/categories/outdoor-light",
    permanent: true,
  },
  {
    source: "/category/commercial",
    destination: "/categories/commercial-led-light",
    permanent: true,
  },
  {
    source: "/category/modules",
    destination: "/categories/fixtures-led-module",
    permanent: true,
  },
  {
    source: "/category/fixtures",
    destination: "/categories/fixtures-led-module",
    permanent: true,
  },
  {
    source: "/category/:path*",
    destination: "/products",
    permanent: true,
  },

  // Old portfolio / product permalinks
  {
    source: "/portfolio",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/portfolio/:path*",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/product/:path*",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/product-category/:path*",
    destination: "/products",
    permanent: true,
  },

  // Static HTML site (legacy /fiam/* pages)
  {
    source: "/fiam/Walllamp",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/fiam/Walllamp.html",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/fiam/walllamp.html",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/fiam/PendantLights.html",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/fiam/TableLamp.html",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/fiam/Branchchandelier.html",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/fiam/HomeLighting.html",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/fiam/ceiling.html",
    destination: "/categories/decorative-lighting",
    permanent: true,
  },
  {
    source: "/fiam/Cobdownlight",
    destination: "/categories/commercial-led-light",
    permanent: true,
  },
  {
    source: "/fiam/Cobdownlight.html",
    destination: "/categories/commercial-led-light",
    permanent: true,
  },
  {
    source: "/fiam/commercial.html",
    destination: "/categories/commercial-led-light",
    permanent: true,
  },
  {
    source: "/fiam/Smddownlight.html",
    destination: "/categories/commercial-led-light",
    permanent: true,
  },
  {
    source: "/fiam/SmdPanellight.html",
    destination: "/categories/commercial-led-light",
    permanent: true,
  },
  {
    source: "/fiam/MiniSpotlight.html",
    destination: "/categories/commercial-led-light",
    permanent: true,
  },
  {
    source: "/fiam/Lightrail.html",
    destination: "/categories/commercial-led-light",
    permanent: true,
  },
  {
    source: "/fiam/cobwallwasher.html",
    destination: "/categories/commercial-led-light",
    permanent: true,
  },
  {
    source: "/fiam/Highpower.html",
    destination: "/categories/outdoor-light",
    permanent: true,
  },
  {
    source: "/fiam/Tolight.html",
    destination: "/categories/outdoor-light",
    permanent: true,
  },
  {
    source: "/fiam/ledbulb.html",
    destination: "/categories/fixtures-led-module",
    permanent: true,
  },
  {
    source: "/fiam/LedLamp.html",
    destination: "/categories/fixtures-led-module",
    permanent: true,
  },
  {
    source: "/fiam/Products.html",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/fiam/storelocator.html",
    destination: "/stores",
    permanent: true,
  },
  {
    source: "/fiam/fiamacademy.html",
    destination: "/about",
    permanent: true,
  },
  {
    source: "/fiam/ipratingschart.html",
    destination: "/about",
    permanent: true,
  },
  {
    source: "/fiam/index.html",
    destination: "/",
    permanent: true,
  },
  {
    source: "/fiam/:path*",
    destination: "/products",
    permanent: true,
  },

  // Root static pages
  {
    source: "/aboutus.html",
    destination: "/about",
    permanent: true,
  },
  {
    source: "/company.html",
    destination: "/about",
    permanent: true,
  },
  {
    source: "/contact.html",
    destination: "/contact",
    permanent: true,
  },
  {
    source: "/index.html",
    destination: "/",
    permanent: true,
  },
  {
    source: "/index-2.html",
    destination: "/",
    permanent: true,
  },
];

const nextConfig: NextConfig = {
  images: {
    // Catalog has 2.5k+ products; Vercel Image Optimization transforms
    // burn the hobby quota on every unique product/size crawl. Serve
    // static assets directly instead (CDN still caches them).
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.fiam.cc",
      },
      {
        protocol: "http",
        hostname: "www.fiam.cc",
      },
    ],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
