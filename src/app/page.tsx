import type { Metadata } from "next";
import { AtmosphereBand } from "@/components/AtmosphereBand";
import { BrandMarquee } from "@/components/BrandMarquee";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FaqSection } from "@/components/FaqSection";
import { FeaturedSale } from "@/components/FeaturedSale";
import { Hero } from "@/components/Hero";
import { PopularProducts } from "@/components/PopularProducts";
import { SolarLights } from "@/components/SolarLights";
import { Testimonials } from "@/components/Testimonials";
import { company } from "@/data/products";
import { JsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Fiam Pakistan | Commercial, Outdoor & Decorative LED Lighting",
  description: company.description,
  path: "/",
  keywords: [
    "Fiam Pakistan official",
    "fiam.com.pk",
    "commercial LED light",
    "outdoor step light",
    "decorative LED panel",
    "LED module GU10 MR16",
  ],
});

const faqs = [
  {
    question: "What lighting categories does Fiam Pakistan supply?",
    answer:
      "We supply Commercial LED Light, Fixtures LED Module/GU10/MR16, Outdoor Light, and Decorative Lighting for homes, offices, retail, and project sites across Pakistan.",
  },
  {
    question: "Where can I buy Fiam products near me?",
    answer:
      "Visit our Store Locations page for dealers in Karachi, Lahore, Islamabad, Multan, Faisalabad, Peshawar, Rawalpindi, and Hyderabad — or contact us for the nearest partner.",
  },
  {
    question: "Do you take corporate or bulk orders?",
    answer:
      "Yes. Use the Corporate page to request product details or bulk quotations for projects, dealers, and companies.",
  },
  {
    question: "How can I get specifications or a quotation?",
    answer:
      "Email info@fiam.com.pk, call +92 321 8208116, or send a message through the contact form. We usually respond with product guidance within one business day.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <BrandMarquee />
      <CategoryGrid />
      <SolarLights />
      <PopularProducts />
      <Testimonials />
      <AtmosphereBand />
      <FeaturedSale />
      <FaqSection items={faqs} />
    </>
  );
}
