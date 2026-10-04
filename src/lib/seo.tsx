import type { Metadata } from "next";
import type { CatalogProduct } from "@/data/catalog";
import { topCategories } from "@/data/catalog";
import { company } from "@/data/products";
import { brandKeywords, pakistanCities } from "@/data/seo-keywords";

const siteName = "Fiam Pakistan";

export function absoluteUrl(path = "/") {
  const base = company.siteUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  keywords = [],
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image || absoluteUrl("/og-default.jpg");
  const mergedKeywords = [...new Set([...brandKeywords, ...keywords])];

  return {
    title,
    description,
    keywords: mergedKeywords,
    authors: [{ name: company.legalName }],
    creator: company.name,
    publisher: company.legalName,
    metadataBase: new URL(company.siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_PK",
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Store", "LightingStore"],
    name: company.name,
    legalName: company.legalName,
    alternateName: [
      company.brandName,
      "FIAM Light Pakistan",
      "best lighting store in Pakistan",
      "LED lights shop Pakistan",
    ],
    url: absoluteUrl("/"),
    logo: absoluteUrl("/fiam-logo.png"),
    image: absoluteUrl("/og-default.jpg"),
    description: company.description,
    email: company.email,
    telephone: company.phone,
    slogan: company.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      ...pakistanCities.map((city) => ({
        "@type": "City",
        name: city,
        containedInPlace: { "@type": "Country", name: "Pakistan" },
      })),
    ],
    hasMap: absoluteUrl("/stores"),
    sameAs: [company.url, "http://www.fiam.cc"],
    brand: company.brands.map((b) => ({
      "@type": "Brand",
      name: b.name,
      description: b.focus,
    })),
    knowsAbout: [
      "best lighting store in Pakistan",
      "LED lights Pakistan",
      "pendant lights Pakistan",
      "chandelier Pakistan",
      "ceiling lights Pakistan",
      "commercial lighting Pakistan",
      "outdoor LED lights Pakistan",
      "decorative lighting Pakistan",
      "downlights Pakistan",
      "track lights Pakistan",
      "solar street lights Pakistan",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.phone,
        contactType: "sales",
        email: company.salesEmail,
        availableLanguage: ["English", "Urdu"],
        areaServed: "PK",
        hoursAvailable: "Mo-Sa 10:00-21:00",
      },
      {
        "@type": "ContactPoint",
        telephone: company.phone,
        contactType: "customer service",
        email: company.email,
        availableLanguage: ["English", "Urdu"],
        areaServed: "PK",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    alternateName: "Fiam Lighting Pakistan",
    url: absoluteUrl("/"),
    description: company.description,
    inLanguage: "en-PK",
    publisher: {
      "@type": "Organization",
      name: company.legalName,
      logo: absoluteUrl("/fiam-logo.png"),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/products?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function categoryListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FIAM lighting categories in Pakistan",
    description:
      "Commercial LED lights, LED module fixtures, outdoor LED lights, and decorative lighting including pendant lights across Pakistan.",
    numberOfItems: topCategories.length,
    itemListElement: topCategories.map((cat, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cat.name,
      url: absoluteUrl(`/categories/${cat.slug}`),
      description: cat.seoDescription,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product: CatalogProduct, categoryName?: string) {
  const rows = product.specs.length ? product.specs : product.params;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.code}${product.seriesTitle ? ` ${product.seriesTitle}` : ""}`.trim(),
    description: [
      product.seriesTitle,
      categoryName,
      "Available in Pakistan from Fiam Pakistan",
      ...rows.slice(0, 6).map((r) => `${r.label}: ${r.value}`),
    ]
      .filter(Boolean)
      .join(". "),
    image: product.images.map((src) => absoluteUrl(src)),
    sku: product.code,
    brand: { "@type": "Brand", name: "FIAM" },
    manufacturer: { "@type": "Organization", name: company.legalName },
    category: categoryName,
    url: absoluteUrl(`/products/${product.slug}`),
    additionalProperty: rows.map((r) => ({
      "@type": "PropertyValue",
      name: r.label,
      value: r.value,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
