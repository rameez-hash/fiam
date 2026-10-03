import type { Metadata } from "next";
import { company, type Product, type Category } from "@/data/products";

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

  return {
    title,
    description,
    keywords: [
      "Fiam Pakistan",
      "FIAM Light",
      "LED lighting Pakistan",
      "commercial LED",
      "outdoor light",
      "decorative lighting",
      ...keywords,
    ],
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
      locale: "en_US",
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
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    alternateName: company.brandName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/fiam-logo.png"),
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.addressShort,
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phone,
      contactType: "sales",
      email: company.salesEmail,
      availableLanguage: ["English", "Urdu"],
      areaServed: "PK",
      hoursAvailable: "Mo-Sa 10:00-21:00",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: absoluteUrl("/"),
    description: company.description,
    publisher: { "@type": "Organization", name: company.legalName },
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

export function productJsonLd(product: Product, category?: Category) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [product.image],
    sku: product.specs.code,
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@type": "Organization", name: company.legalName },
    category: category?.name,
    url: absoluteUrl(`/products/${product.slug}`),
    additionalProperty: Object.entries(product.specs)
      .filter(([, v]) => v)
      .map(([name, value]) => ({
        "@type": "PropertyValue",
        name,
        value,
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
