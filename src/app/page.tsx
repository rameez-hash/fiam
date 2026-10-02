import type { Metadata } from "next";
import { AtmosphereBand } from "@/components/AtmosphereBand";
import { CategoryGrid } from "@/components/CategoryGrid";
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
      "Fiam Pakistan supplies Commercial LED Light, Fixtures LED Module/GU10/MR16, Outdoor Light, and Decorative Lighting for architectural and commercial projects.",
  },
  {
    question: "How do I contact Fiam Pakistan?",
    answer:
      "Email info@fiam.com.pk or use the contact form on fiam.com.pk for product specifications, samples, and project quotations.",
  },
  {
    question: "How can I request product specifications or a quotation?",
    answer:
      "Contact Fiam Pakistan at info@fiam.com.pk, or use the contact form on this website for project support.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <CategoryGrid />
      <SolarLights />
      <PopularProducts />
      <Testimonials />
      <AtmosphereBand />
      <FeaturedSale />

      <section className="section-pad bg-white border-t border-line">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-10 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-lg font-semibold text-ink">{faq.question}</h3>
                <p className="mt-2 text-ink-soft leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
