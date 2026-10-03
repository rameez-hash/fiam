export type ProductSpec = {
  code: string;
  name: string;
  ledType?: string;
  voltage?: string;
  luminousFlux?: string;
  finish?: string;
  material?: string;
  size?: string;
  cutout?: string;
  beamAngle?: string;
  colorTemperature?: string;
  ipClassification?: string;
  dimmable?: string;
  installation?: string;
  operatingTemperature?: string;
  lifeTime?: string;
  driver?: string;
  socket?: string;
};

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  highlight: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  series: string;
  tagline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  featured?: boolean;
  popular?: boolean;
  specs: ProductSpec;
};

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

export const categories: Category[] = [
  {
    slug: "commercial-led-light",
    name: "Commercial LED Light",
    shortName: "Commercial",
    description:
      "Linear lights, wall washers, and architectural LED systems engineered for offices, retail, hospitality, and public spaces.",
    seoTitle: "Commercial LED Lights | Linear & Wall Washer Fixtures | Fiam Pakistan",
    seoDescription:
      "Browse Fiam Pakistan commercial LED lighting: linear lights, wall washers, and architectural fixtures with high efficiency, IP65 options, and long service life.",
    image: IMG("/upload/2/image/202307/28130831HWYNTU.png"),
    highlight: "Architectural linear systems",
  },
  {
    slug: "fixtures-led-module",
    name: "Fixtures LED Module / GU10 / MR16",
    shortName: "LED Modules",
    description:
      "Precision downlights, PAR and AR111 modules, and GU10/MR16 fixtures for flexible recessed lighting layouts.",
    seoTitle: "LED Modules GU10 MR16 Downlights | Fiam Pakistan",
    seoDescription:
      "Fiam Pakistan LED modules and fixtures including GU10, MR16, PAR38, and AR111 for recessed downlights with adjustable beams and durable aluminium housings.",
    image: IMG("/upload/2/image/202308/19173940WEFVZP.jpg"),
    highlight: "GU10 · MR16 · PAR · AR111",
  },
  {
    slug: "outdoor-light",
    name: "Outdoor Light",
    shortName: "Outdoor",
    description:
      "IP65 step lights and exterior luminaires built for pathways, façades, gardens, and architectural outdoor projects.",
    seoTitle: "Outdoor LED Lights & Step Lights IP65 | Fiam Pakistan",
    seoDescription:
      "Discover Fiam Pakistan outdoor LED step lights and exterior fixtures with IP65 protection, multiple CCT options, and recessed installation for landscape and architecture.",
    image: IMG("/upload/2/image/202309/04111615ENEJ6Q.png"),
    highlight: "IP65 exterior luminaires",
  },
  {
    slug: "decorative-lighting",
    name: "Decorative Lighting",
    shortName: "Decorative",
    description:
      "Panel and decorative luminaires that shape atmosphere in residential, hospitality, and boutique commercial interiors.",
    seoTitle: "Decorative LED Lighting & Panels | Fiam Pakistan",
    seoDescription:
      "Shop Fiam Pakistan decorative LED lighting including FSS515 series panels and MT series fixtures for soft, atmosphere-driven interior illumination.",
    image: IMG("/upload/2/image/202405/23160221xwW86E.png"),
    highlight: "Atmosphere-first interiors",
  },
];

export const products: Product[] = [
  {
    id: "2641",
    slug: "fm-x1023",
    name: "FM-X1023",
    categorySlug: "commercial-led-light",
    series: "Linear Light and Wall Washer Series",
    tagline: "RGB linear wall washer for architectural accents",
    description:
      "The FM-X1023 linear light and wall washer delivers vivid RGB colour control for recessed commercial installations. Built for continuous architectural lines, it combines SMD LED efficiency with IP65 protection for demanding interiors and semi-exposed spaces.",
    seoTitle: "FM-X1023 Linear LED Wall Washer RGB IP65 | FIAM",
    seoDescription:
      "FM-X1023 commercial linear LED wall washer by FIAM. RGB colour, IP65, recessed installation, 50,000hr lifetime. Request specs and project support.",
    image: IMG("/upload/2/image/202307/28130831HWYNTU.png"),
    featured: true,
    popular: true,
    specs: {
      code: "FM-X1023-12W",
      name: "Linear Light and Wall Washer Series",
      ledType: "SMD",
      voltage: "220-240V",
      finish: "Black / Gray",
      colorTemperature: "RGB",
      ipClassification: "65",
      dimmable: "No",
      installation: "Recessed",
      operatingTemperature: "-20°C to +40°C",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2640",
    slug: "fm-x2020",
    name: "FM-X2020",
    categorySlug: "commercial-led-light",
    series: "Linear Light and Wall Washer Series",
    tagline: "Flexible contour lighting for modern interiors",
    description:
      "FM-X2020 is a commercial linear LED solution designed for soft architectural curves and continuous light lines. Ideal for retail and hospitality feature walls where clean aesthetics and reliable illumination matter.",
    seoTitle: "FM-X2020 Commercial Linear LED Light | FIAM",
    seoDescription:
      "FM-X2020 linear LED fixture from FIAM for commercial interiors. Contour-friendly design for retail, hospitality, and architectural lighting projects.",
    image: IMG("/upload/2/image/202307/28130748TQRHED.png"),
    featured: true,
    popular: true,
    specs: {
      code: "FM-X2020",
      name: "Linear Light and Wall Washer Series",
      ledType: "SMD",
      voltage: "220-240V",
      finish: "White / Custom",
      installation: "Recessed / Surface",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2639",
    slug: "fm-lt1616",
    name: "FM-LT1616",
    categorySlug: "commercial-led-light",
    series: "Linear Light and Wall Washer Series",
    tagline: "Compact linear LED for tight architectural details",
    description:
      "FM-LT1616 brings compact linear illumination to corridors, niches, and detailed commercial installations. A versatile FIAM fixture for designers who need precise light lines without bulky profiles.",
    seoTitle: "FM-LT1616 Compact Linear LED Fixture | FIAM",
    seoDescription:
      "FM-LT1616 compact commercial linear LED by FIAM. Designed for niches, corridors, and detailed architectural lighting applications.",
    image: IMG("/upload/2/image/202307/28130648UQ76JA.png"),
    popular: true,
    specs: {
      code: "FM-LT1616",
      name: "Linear Light and Wall Washer Series",
      ledType: "SMD",
      voltage: "220-240V",
      installation: "Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2638",
    slug: "fm-xt2527",
    name: "FM-XT2527",
    categorySlug: "commercial-led-light",
    series: "Linear Light and Wall Washer Series",
    tagline: "Extended linear profile for continuous runs",
    description:
      "FM-XT2527 supports longer continuous linear runs for offices, galleries, and commercial ceilings. Engineered for consistent light quality across extended architectural layouts.",
    seoTitle: "FM-XT2527 Extended Linear LED Profile | FIAM",
    seoDescription:
      "FM-XT2527 commercial linear LED profile by FIAM for continuous ceiling and wall runs in offices, galleries, and retail spaces.",
    image: IMG("/upload/2/image/202307/04160616JKVJZK.png"),
    featured: true,
    specs: {
      code: "FM-XT2527",
      name: "Linear Light and Wall Washer Series",
      ledType: "SMD",
      voltage: "220-240V",
      installation: "Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2637",
    slug: "fm-xt2527-variant",
    name: "FM-XT2527 Variant",
    categorySlug: "commercial-led-light",
    series: "Linear Light and Wall Washer Series",
    tagline: "Alternate finish linear wall washer",
    description:
      "An alternate FM-XT2527 configuration for projects that need matching linear performance with a different visual finish or mounting detail within the same commercial series.",
    seoTitle: "FM-XT2527 Variant Linear LED | FIAM Commercial",
    seoDescription:
      "FM-XT2527 variant commercial linear LED from FIAM. Same series performance with alternate finish options for coordinated project packages.",
    image: IMG("/upload/2/image/202307/04160558BJUDU6.png"),
    specs: {
      code: "FM-XT2527-V",
      name: "Linear Light and Wall Washer Series",
      ledType: "SMD",
      voltage: "220-240V",
      installation: "Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2630",
    slug: "foww320-24w",
    name: "FOWW320-24W",
    categorySlug: "commercial-led-light",
    series: "Wall Washer Series",
    tagline: "24W wall washer for even vertical illumination",
    description:
      "FOWW320-24W is a dedicated commercial wall washer delivering even vertical wash for façades, feature walls, and display areas. A reliable 24W solution for architectural highlight lighting.",
    seoTitle: "FOWW320-24W LED Wall Washer | FIAM Commercial",
    seoDescription:
      "FOWW320-24W commercial LED wall washer by FIAM. Even vertical illumination for feature walls, façades, and display lighting projects.",
    image: IMG("/upload/2/image/202307/041537198TTVK4.png"),
    popular: true,
    specs: {
      code: "FOWW320-24W",
      name: "Wall Washer Series",
      voltage: "220-240V",
      installation: "Surface / Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2733",
    slug: "fta717-par38-e27",
    name: "FTA717-PAR38-E27",
    categorySlug: "fixtures-led-module",
    series: "Fixtures LED Module Series",
    tagline: "PAR38 recessed module with adjustable beam",
    description:
      "FTA717-PAR38-E27 is a die-cast aluminium recessed downlight module compatible with GU10/MR16 optics up to 50W. Adjustable beam aiming makes it ideal for retail displays and accent lighting.",
    seoTitle: "FTA717-PAR38-E27 LED Downlight Module | FIAM",
    seoDescription:
      "FTA717-PAR38-E27 FIAM LED module fixture. Aluminium die casting, adjustable beam, GU10/MR16 compatible recessed downlight for commercial accents.",
    image: IMG("/upload/2/image/202308/19173940WEFVZP.jpg"),
    featured: true,
    popular: true,
    specs: {
      code: "FTA717-PAR38-E27",
      name: "Fixtures LED Module Series",
      driver: "FIAM Driver",
      socket: "GU10/MR16 1×MAX×50",
      finish: "White",
      material: "Aluminium Die Casting",
      beamAngle: "Adjustable",
      size: "ø54.5×110×H138mm",
      dimmable: "No",
      installation: "Recessed downlight",
      operatingTemperature: "-20°C to +40°C",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2732",
    slug: "fta717-pae20-e27",
    name: "FTA717-PAE20-E27",
    categorySlug: "fixtures-led-module",
    series: "Fixtures LED Module Series",
    tagline: "Compact E27 recessed LED module",
    description:
      "FTA717-PAE20-E27 offers a compact recessed module format for ceilings that need clean aperture lighting with FIAM driver compatibility and durable housing.",
    seoTitle: "FTA717-PAE20-E27 Compact LED Module | FIAM",
    seoDescription:
      "FTA717-PAE20-E27 FIAM recessed LED module for compact commercial ceiling installations with reliable driver support.",
    image: IMG("/upload/2/image/202308/19173902CVVMD2.jpg"),
    popular: true,
    specs: {
      code: "FTA717-PAE20-E27",
      name: "Fixtures LED Module Series",
      driver: "FIAM Driver",
      finish: "White",
      material: "Aluminium Die Casting",
      installation: "Recessed downlight",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2731",
    slug: "fta17-mr16-gu10",
    name: "FTA17-MR16-GU10",
    categorySlug: "fixtures-led-module",
    series: "Fixtures LED Module Series",
    tagline: "MR16 / GU10 compatible recessed fixture",
    description:
      "FTA17-MR16-GU10 supports popular MR16 and GU10 lamp formats in a recessed commercial fixture, giving lighting designers flexible source options for accent and general downlighting.",
    seoTitle: "FTA17-MR16-GU10 Recessed LED Fixture | FIAM",
    seoDescription:
      "FTA17-MR16-GU10 FIAM recessed fixture compatible with MR16 and GU10 sources for flexible commercial downlighting.",
    image: IMG("/upload/2/image/202308/19173743BQMBFS.jpg"),
    specs: {
      code: "FTA17-MR16-GU10",
      name: "Fixtures LED Module Series",
      socket: "MR16 / GU10",
      installation: "Recessed downlight",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2730",
    slug: "fta717-e27",
    name: "FTA717-E27",
    categorySlug: "fixtures-led-module",
    series: "Fixtures LED Module Series",
    tagline: "E27 recessed downlight housing",
    description:
      "FTA717-E27 is a practical recessed downlight housing for E27 lamp systems, suited to hospitality and commercial retrofit projects that need FIAM build quality.",
    seoTitle: "FTA717-E27 Recessed Downlight Housing | FIAM",
    seoDescription:
      "FTA717-E27 FIAM recessed downlight housing for E27 systems in hospitality and commercial lighting projects.",
    image: IMG("/upload/2/image/202308/19173658D67ACE.jpg"),
    specs: {
      code: "FTA717-E27",
      name: "Fixtures LED Module Series",
      socket: "E27",
      installation: "Recessed downlight",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2729",
    slug: "fpm717-ar111",
    name: "FPM717-AR111",
    categorySlug: "fixtures-led-module",
    series: "Fixtures LED Module Series",
    tagline: "AR111 module for focused accent beams",
    description:
      "FPM717-AR111 is designed for focused accent lighting with AR111 optics—perfect for galleries, boutiques, and product displays that require directed illumination.",
    seoTitle: "FPM717-AR111 LED Accent Module | FIAM",
    seoDescription:
      "FPM717-AR111 FIAM LED module for AR111 accent lighting in galleries, retail displays, and boutique interiors.",
    image: IMG("/upload/2/image/202308/19173423QY9W9X.jpg"),
    featured: true,
    specs: {
      code: "FPM717-AR111",
      name: "Fixtures LED Module Series",
      socket: "AR111",
      installation: "Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2600",
    slug: "fpm1090s-mr16-ad",
    name: "FPM1090S-MR16-AD",
    categorySlug: "fixtures-led-module",
    series: "Fixtures LED Module Series",
    tagline: "Adjustable MR16 module for precise aiming",
    description:
      "FPM1090S-MR16-AD features adjustable aiming for MR16 sources, enabling precise spotlight control in commercial ceilings and display environments.",
    seoTitle: "FPM1090S-MR16-AD Adjustable MR16 Module | FIAM",
    seoDescription:
      "FPM1090S-MR16-AD adjustable MR16 LED module by FIAM for precise accent aiming in commercial and retail ceilings.",
    image: IMG("/upload/2/image/202306/19112003MLFLBZ.jpg"),
    popular: true,
    specs: {
      code: "FPM1090S-MR16-AD",
      name: "Fixtures LED Module Series",
      socket: "MR16",
      beamAngle: "Adjustable",
      installation: "Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2742",
    slug: "fosl246",
    name: "FOSL246",
    categorySlug: "outdoor-light",
    series: "Step Light Series",
    tagline: "IP65 step light for safe outdoor pathways",
    description:
      "FOSL246 is an IP65 recessed step light providing 60LM soft guidance light for stairs, pathways, and outdoor architectural edges. Available in 3000K, 4000K, and 6000K.",
    seoTitle: "FOSL246 IP65 Outdoor LED Step Light | FIAM",
    seoDescription:
      "FOSL246 FIAM outdoor step light. IP65, 60LM, 120° beam, CCT 3000K/4000K/6000K, recessed installation for pathways and stairs.",
    image: IMG("/upload/2/image/202309/04111615ENEJ6Q.png"),
    featured: true,
    popular: true,
    specs: {
      code: "FOSL246",
      name: "Step Light Series",
      ledType: "SMD",
      voltage: "AC220-240",
      luminousFlux: "60LM",
      finish: "Gray / Black",
      size: "212×92×48mm",
      beamAngle: "120°",
      colorTemperature: "3000K / 4000K / 6000K",
      ipClassification: "65",
      dimmable: "No",
      installation: "Recessed",
      operatingTemperature: "-20°C to +40°C",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2741",
    slug: "fosl245",
    name: "FOSL245",
    categorySlug: "outdoor-light",
    series: "Step Light Series",
    tagline: "Recessed exterior step illumination",
    description:
      "FOSL245 continues the FIAM outdoor step light series with a refined recessed profile for landscape edges, garden steps, and exterior architectural guidance.",
    seoTitle: "FOSL245 Outdoor LED Step Light | FIAM",
    seoDescription:
      "FOSL245 FIAM outdoor LED step light for recessed exterior pathway and landscape lighting installations.",
    image: IMG("/upload/2/image/202309/04111328QTZZ7C.png"),
    popular: true,
    specs: {
      code: "FOSL245",
      name: "Step Light Series",
      ledType: "SMD",
      voltage: "AC220-240",
      ipClassification: "65",
      installation: "Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2740",
    slug: "fosl244",
    name: "FOSL244",
    categorySlug: "outdoor-light",
    series: "Step Light Series",
    tagline: "Durable outdoor recessed step fixture",
    description:
      "FOSL244 is built for durable outdoor recessed step lighting where weather resistance and discreet daytime appearance are equally important.",
    seoTitle: "FOSL244 Weather-Resistant Step Light | FIAM",
    seoDescription:
      "FOSL244 FIAM weather-resistant outdoor step light for discreet recessed landscape and pathway illumination.",
    image: IMG("/upload/2/image/202309/04111043BEJTR9.png"),
    specs: {
      code: "FOSL244",
      name: "Step Light Series",
      ledType: "SMD",
      ipClassification: "65",
      installation: "Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2739",
    slug: "fosl200",
    name: "FOSL200",
    categorySlug: "outdoor-light",
    series: "Step Light Series",
    tagline: "Compact outdoor step light",
    description:
      "FOSL200 delivers compact outdoor step lighting for smaller apertures and tight landscape details while maintaining FIAM outdoor durability standards.",
    seoTitle: "FOSL200 Compact Outdoor Step Light | FIAM",
    seoDescription:
      "FOSL200 compact FIAM outdoor LED step light for small-aperture landscape and architectural pathway lighting.",
    image: IMG("/upload/2/image/202308/31112054A92W43.png"),
    popular: true,
    specs: {
      code: "FOSL200",
      name: "Step Light Series",
      ledType: "SMD",
      ipClassification: "65",
      installation: "Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2738",
    slug: "fosl200-alt",
    name: "FOSL200 Alt",
    categorySlug: "outdoor-light",
    series: "Step Light Series",
    tagline: "Alternate finish compact step light",
    description:
      "Alternate FOSL200 finish option for coordinated outdoor packages where multiple step light appearances are required across one project.",
    seoTitle: "FOSL200 Alt Outdoor Step Light Finish | FIAM",
    seoDescription:
      "FOSL200 alternate finish outdoor step light by FIAM for coordinated multi-fixture landscape lighting packages.",
    image: IMG("/upload/2/image/202309/04110900U3G9MG.png"),
    specs: {
      code: "FOSL200-ALT",
      name: "Step Light Series",
      ledType: "SMD",
      ipClassification: "65",
      installation: "Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2737",
    slug: "fosl243",
    name: "FOSL243",
    categorySlug: "outdoor-light",
    series: "Step Light Series",
    tagline: "Architectural outdoor step guidance light",
    description:
      "FOSL243 provides architectural outdoor step guidance with a clean recessed look suitable for hotels, villas, and commercial exterior circulation paths.",
    seoTitle: "FOSL243 Architectural Outdoor Step Light | FIAM",
    seoDescription:
      "FOSL243 FIAM architectural outdoor step light for hotels, villas, and commercial exterior circulation lighting.",
    image: IMG("/upload/2/image/202308/31110023HXUWAW.png"),
    specs: {
      code: "FOSL243",
      name: "Step Light Series",
      ledType: "SMD",
      ipClassification: "65",
      installation: "Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2918",
    slug: "fss515-x-50w",
    name: "FSS515-X 50W",
    categorySlug: "decorative-lighting",
    series: "FSS515 Decorative Panel Series",
    tagline: "50W decorative panel for soft ambient glow",
    description:
      "FSS515-X 50W combines a PS diffuser and PMMA light guide for soft, even decorative ambient light. Matt white finish suits hospitality and boutique commercial ceilings.",
    seoTitle: "FSS515-X 50W Decorative LED Panel | FIAM",
    seoDescription:
      "FSS515-X 50W FIAM decorative LED panel with PS diffuser and PMMA light guide. Soft ambient lighting for hospitality and interiors.",
    image: IMG("/upload/2/image/202405/23160221xwW86E.png"),
    featured: true,
    popular: true,
    specs: {
      code: "FSS515-X 50W",
      name: "FSS515-X 50W",
      driver: "FIAM",
      socket: "Full-spectrum 2835 0.5W",
      finish: "Matt white",
      material: "PS diffuser plate + PMMA light guide plate",
      size: "813×45",
      dimmable: "No",
      installation: "Recessed downlight",
      operatingTemperature: "-20°C to +40°C",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2917",
    slug: "fss515-x-40w",
    name: "FSS515-X 40W",
    categorySlug: "decorative-lighting",
    series: "FSS515 Decorative Panel Series",
    tagline: "40W decorative panel for balanced ambience",
    description:
      "FSS515-X 40W offers a balanced decorative panel output for living areas, lounges, and boutique retail ceilings where soft atmosphere is the design goal.",
    seoTitle: "FSS515-X 40W Decorative LED Panel | FIAM",
    seoDescription:
      "FSS515-X 40W FIAM decorative LED panel for soft ambient interiors in hospitality, lounge, and boutique retail spaces.",
    image: IMG("/upload/2/image/202405/23160221xwW86E.png"),
    popular: true,
    specs: {
      code: "FSS515-X 40W",
      name: "FSS515-X 40W",
      driver: "FIAM",
      finish: "Matt white",
      material: "PS diffuser plate + PMMA light guide plate",
      installation: "Recessed downlight",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2916",
    slug: "fss515-x-60w",
    name: "FSS515-X 60W",
    categorySlug: "decorative-lighting",
    series: "FSS515 Decorative Panel Series",
    tagline: "60W higher-output decorative panel",
    description:
      "FSS515-X 60W steps up decorative panel output for larger rooms and open-plan interiors that still need a soft, diffused visual character.",
    seoTitle: "FSS515-X 60W High-Output Decorative Panel | FIAM",
    seoDescription:
      "FSS515-X 60W FIAM decorative LED panel for larger interiors needing higher ambient output with soft diffusion.",
    image: IMG("/upload/2/image/202405/23160221xwW86E.png"),
    specs: {
      code: "FSS515-X 60W",
      name: "FSS515-X 60W",
      driver: "FIAM",
      finish: "Matt white",
      material: "PS diffuser plate + PMMA light guide plate",
      installation: "Recessed downlight",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2914",
    slug: "fss515-d-80w",
    name: "FSS515-D 80W",
    categorySlug: "decorative-lighting",
    series: "FSS515 Decorative Panel Series",
    tagline: "80W decorative panel for statement ceilings",
    description:
      "FSS515-D 80W is the higher-power decorative panel option for statement ceilings and spacious decorative lighting schemes.",
    seoTitle: "FSS515-D 80W Decorative LED Panel | FIAM",
    seoDescription:
      "FSS515-D 80W FIAM decorative LED panel for statement ceilings and spacious ambient lighting schemes.",
    image: IMG("/upload/2/image/202405/231559198sxqEL.png"),
    featured: true,
    specs: {
      code: "FSS515-D 80W",
      name: "FSS515-D 80W",
      driver: "FIAM",
      finish: "Matt white",
      installation: "Recessed downlight",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2848",
    slug: "mt4522m-1p",
    name: "MT4522M-1P",
    categorySlug: "decorative-lighting",
    series: "MT Decorative Series",
    tagline: "Single-point decorative accent luminaire",
    description:
      "MT4522M-1P is a single-point decorative accent luminaire for curated interiors, feature niches, and boutique commercial spaces.",
    seoTitle: "MT4522M-1P Decorative Accent Light | FIAM",
    seoDescription:
      "MT4522M-1P FIAM decorative accent luminaire for boutique interiors, niches, and curated commercial lighting.",
    image: IMG("/upload/2/image/202405/21163727jYWEGB.png"),
    popular: true,
    specs: {
      code: "MT4522M-1P",
      name: "MT Decorative Series",
      installation: "Surface / Recessed",
      lifeTime: "50,000hrs",
    },
  },
  {
    id: "2980",
    slug: "mt4547-8p",
    name: "MT4547-8P",
    categorySlug: "decorative-lighting",
    series: "MT Decorative Series",
    tagline: "Multi-point decorative composition light",
    description:
      "MT4547-8P creates multi-point decorative compositions for feature ceilings and atmospheric dining or lounge environments.",
    seoTitle: "MT4547-8P Multi-Point Decorative Light | FIAM",
    seoDescription:
      "MT4547-8P FIAM multi-point decorative luminaire for feature ceilings, dining, and lounge atmosphere lighting.",
    image: IMG("/upload/2/image/202405/21163912Yhwje9.png"),
    featured: true,
    specs: {
      code: "MT4547-8P",
      name: "MT Decorative Series",
      installation: "Surface / Recessed",
      lifeTime: "50,000hrs",
    },
  },
];

export const heroSlides = [
  {
    image: "/hero-commercial.jpg",
    title: "Commercial\nLED lights",
    subtitle:
      "Linear lights and wall washers for offices, retail, and large commercial projects.",
    ctaLabel: "Shop commercial LED",
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

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getPopularProducts() {
  return products.filter((p) => p.popular);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, limit);
}
