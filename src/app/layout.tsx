import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { company } from "@/data/products";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Fiam Pakistan | Commercial, Outdoor & Decorative LED Lighting",
    template: "%s | Fiam Pakistan",
  },
  description: company.description,
  keywords: [
    "Fiam Pakistan",
    "FIAM Light",
    "LED lighting Pakistan",
    "commercial LED",
    "outdoor light",
    "decorative lighting",
    "GU10 MR16",
    "architectural lighting",
  ],
  authors: [{ name: company.legalName }],
  creator: company.name,
  publisher: company.legalName,
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Fiam Pakistan",
    title: "Fiam Pakistan | Commercial, Outdoor & Decorative LED Lighting",
    description: company.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiam Pakistan",
    description: company.description,
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-sans">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
