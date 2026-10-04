const IMG = (path: string) => `http://www.fiam.cc${path}`;

export const company = {
  name: "Fiam Pakistan",
  legalName: "Pak Burma Traders",
  brandName: "Fiam Lighting Pakistan",
  tagline: "Give light a special spot in every space",
  description:
    "Fiam Lighting Pakistan supplies commercial LED fixtures, outdoor luminaires, decorative lighting, and LED modules through Pak Burma Traders — the exclusive FIAM importer for Pakistan.",
  about:
    "Established in 1980 by Abdul Sattar Khadbai, Pak Burma Traders is the exclusive importer of FIAM Lighting in Pakistan. The company began with lighting fixture parts and, in 1998, became an early wholesaler of imported lighting products for the local market. In 2002 it secured exclusive distribution of FIAM Lighting in Pakistan, and has since built a nationwide retailer network for quality fixtures and luminaires.",
  companyGroup:
    "FIAM Hong Kong Ltd (est. 2001) manufactures and supplies commercial, decorative, and outdoor lighting from China and partner factories worldwide. In Pakistan, products are distributed exclusively by Pak Burma Traders under the Fiam Lighting Pakistan brand.",
  email: "info@fiam.com.pk",
  altEmail: "info@fiamlights.com.pk",
  salesEmail: "info@fiam.com.pk",
  phone: "+92 321 8208116",
  phoneTel: "+923218208116",
  hours: "Mon–Sat: 10:00 AM – 9:00 PM",
  address: "Shop No. 3/4, Parsa Classic, Block 9, Clifton, Karachi, Pakistan",
  addressShort: "Parsa Classic, Block 9, Clifton, Karachi",
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
    image: "/hero-commercial.jpg",
    title: "Commercial\nLED lights",
    subtitle:
      "Linear lights and wall washers for offices, retail, and large commercial projects.",
    ctaLabel: "Explore commercial LED",
    ctaHref: "/categories/commercial-led-light",
  },
  {
    image: IMG("/upload/2/image/202512/13174146dN9N7n.jpg"),
    title: "Fixtures for\nevery project",
    subtitle: "Modules, outdoor lights, and decorative fixtures with clear technical specs.",
    ctaLabel: "View products",
    ctaHref: "/products",
  },
  {
    image: IMG("/upload/2/image/202512/13174130u86tJ8.jpg"),
    title: "Supply for\nPakistan projects",
    subtitle: "Product support and bulk quotations for contractors and facility teams.",
    ctaLabel: "Corporate orders",
    ctaHref: "/corporate",
  },
];

