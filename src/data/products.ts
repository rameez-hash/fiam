const IMG = (path: string) => `http://www.fiam.cc${path}`;

export const company = {
  name: "Fiam Pakistan",
  legalName: "Pak Burma Traders",
  brandName: "Fiam Lighting Pakistan",
  tagline: "Top LED lights store Pakistan for commercial, outdoor and decorative lighting",
  description:
    "Fiam Pakistan is a leading lighting store and LED lights company in Pakistan. Exclusive FIAM importer for commercial lighting, pendant lights, chandeliers, ceiling lights, outdoor LED lights, GU10/MR16 modules, and decorative lighting across Karachi, Lahore, Islamabad, and nationwide.",
  about:
    "Established in 1980 by Abdul Sattar Khadbai, Pak Burma Traders is the exclusive importer of FIAM Lighting in Pakistan. The company began with lighting fixture parts and, in 1998, became an early wholesaler of imported lighting products for the local market. In 2002 it secured exclusive distribution of FIAM Lighting in Pakistan, and has since built a nationwide retailer network for quality fixtures and luminaires.",
  companyGroup:
    "FIAM Hong Kong Ltd (est. 2001) manufactures and supplies commercial, decorative, and outdoor lighting from China and partner factories worldwide. In Pakistan, products are distributed exclusively by Pak Burma Traders under the Fiam Lighting Pakistan brand.",
  email: "info@fiam.com.pk",
  salesEmail: "info@fiam.com.pk",
  phone: "+92 321 8208116",
  phoneTel: "+923218208116",
  hours: "Mon-Sat: 10:00 AM - 9:00 PM",
  url: "https://fiam.com.pk",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://fiam.com.pk",
  brands: [
    { name: "FIAM", focus: "Commercial lighting fixtures" },
    { name: "MACY", focus: "Decorative indoor lighting" },
    { name: "LAVOV", focus: "Advanced LED lighting solutions" },
    { name: "ARTILUX", focus: "Panel lights solutions" },
  ],
};

export const heroSlides = [
  {
    image: "/hero-no1.jpg",
    title: "Pakistan's No.1\nLED light company",
    subtitle:
      "Commercial, outdoor, and decorative LED lighting for homes, offices, and projects nationwide.",
    ctaLabel: "View products",
    ctaHref: "/products",
    label: "No.1 LED company",
  },
  {
    image: "/hero-decorative.jpg",
    title: "Decorative\nlighting",
    subtitle:
      "Pendants, chandeliers, wall, table and floor lamps for homes and hospitality.",
    ctaLabel: "Explore decorative",
    ctaHref: "/categories/decorative-lighting",
    label: "Decorative",
  },
  {
    image: "/hero-outdoor.jpg",
    title: "Outdoor\nLED lights",
    subtitle:
      "IP-rated step lights, wall lights, bollards and floodlights for gardens and façades.",
    ctaLabel: "Explore outdoor",
    ctaHref: "/categories/outdoor-light",
    label: "Outdoor LED",
  },
  {
    image: "/hero-commercial-v2.jpg",
    title: "Commercial\nLED lights",
    subtitle:
      "Linear lights, downlights, panels and wall washers for offices, retail, and large spaces.",
    ctaLabel: "Explore commercial",
    ctaHref: "/categories/commercial-led-light",
    label: "Commercial LED",
  },
  {
    image: "/hero-modules.jpg",
    title: "Fixtures\nLED Module",
    subtitle:
      "Recessed and surface housings for GU10, MR16, AR111 and PAR modules.",
    ctaLabel: "Explore modules",
    ctaHref: "/categories/fixtures-led-module",
    label: "LED Module",
  },
];

