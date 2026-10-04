import type { Metadata } from "next";
import { AtmosphereBand } from "@/components/AtmosphereBand";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/Hero";
import { PopularProducts } from "@/components/PopularProducts";
import { SolarLights } from "@/components/SolarLights";
import { StoresPreview } from "@/components/StoresPreview";
import { Testimonials } from "@/components/Testimonials";
import { homeSeo, homePageKeywords } from "@/data/seo-keywords";
import { JsonLd, buildMetadata, categoryListJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: homeSeo.title,
  description: homeSeo.description,
  path: "/",
  keywords: homePageKeywords(),
});

const faqs = [
  {
    question: "Is Fiam Pakistan among the best lighting stores in Pakistan?",
    answer:
      "Yes. Fiam Pakistan (Pak Burma Traders) is the exclusive FIAM importer and a leading lighting store and LED lights shop with retail partners across Karachi, Lahore, Islamabad, Multan, Faisalabad, Peshawar, Rawalpindi, and Hyderabad.",
  },
  {
    question: "What lighting categories can I buy from Fiam Pakistan?",
    answer:
      "You can buy commercial lighting, LED downlights, track lights, panel lights, pendant lights, chandeliers, wall lights, outdoor LED lights, solar street lights, GU10/MR16 LED modules, and decorative lighting for homes and projects across Pakistan.",
  },
  {
    question: "Can I buy LED lights online in Pakistan from Fiam?",
    answer:
      "Browse the full catalog online at fiam.com.pk, then contact us or visit a partner store for pricing, availability, and delivery support anywhere in Pakistan.",
  },
  {
    question: "Where can I find a lighting store or LED lights shop near me?",
    answer:
      "Open our Store Locations page to find lighting stores and Fiam dealers in major cities across Pakistan, or call +92 321 8208116 for the nearest partner.",
  },
  {
    question: "Do you supply commercial and outdoor lighting for projects?",
    answer:
      "Yes. Use the Corporate page for bulk and project quotations on commercial LED lighting, office lights, outdoor lights, and decorative fixtures nationwide.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(faqs), categoryListJsonLd()]} />
      <Hero />
      <CategoryGrid />
      <AtmosphereBand />
      <PopularProducts />
      <StoresPreview />
      <SolarLights />
      <Testimonials />
      <FaqSection items={faqs} />
    </>
  );
}
