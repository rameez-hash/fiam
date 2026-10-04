import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { countProducts, getChildren, nodeImage, topCategories } from "@/data/catalog";
import { company } from "@/data/products";
import { homeSeo, homePageKeywords } from "@/data/seo-keywords";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: homeSeo.title,
    template: "%s | Fiam Pakistan",
  },
  description: homeSeo.description,
  keywords: homePageKeywords(),
  authors: [{ name: company.legalName }],
  creator: company.name,
  publisher: company.legalName,
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Fiam Pakistan",
    title: homeSeo.title,
    description: homeSeo.description,
    url: company.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
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

const motionBootScript = `(function(){var d=document.documentElement;d.classList.add("motion-ready");setTimeout(function(){if(d.dataset.motion!=="on")d.classList.remove("motion-ready")},3500)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body className="min-h-full flex flex-col antialiased font-sans">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header
          menu={topCategories.map((cat) => ({
            slug: cat.slug,
            name: cat.name,
            image: nodeImage(cat),
            count: countProducts(cat),
            series: getChildren(cat).map((s) => ({ slug: s.slug, name: s.name })),
          }))}
        />
        <main className="flex-1">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
