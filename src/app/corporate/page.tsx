import type { Metadata } from "next";
import Link from "next/link";
import { CorporateOrderForm } from "@/components/CorporateOrderForm";
import { categories, company } from "@/data/products";
import { JsonLd, breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Corporate & Bulk LED Orders",
  description:
    "Corporate lighting desk at Fiam Pakistan — request product specs or place bulk/wholesale LED orders for projects, dealers, and companies. Email info@fiam.com.pk.",
  path: "/corporate",
  keywords: [
    "Fiam Pakistan corporate",
    "bulk LED order Pakistan",
    "wholesale lighting",
    "corporate lighting quotation",
    "info@fiam.com.pk",
  ],
});

const benefits = [
  {
    title: "Bulk & wholesale",
    text: "Volume pricing and package quotes for dealers, contractors, and large fit-out projects.",
  },
  {
    title: "Product guidance",
    text: "Help choosing commercial linear, modules, outdoor step lights, or decorative panels.",
  },
  {
    title: "Project support",
    text: "Share site details and timelines — we respond with suitable models and quantities.",
  },
];

const faqs = [
  {
    question: "Who is the Corporate page for?",
    answer:
      "Companies, architects, contractors, and dealers who need product information or bulk LED orders from Fiam Pakistan.",
  },
  {
    question: "Can I order multiple product categories in one request?",
    answer:
      "Yes. Select a primary category or leave product as “any / multiple”, then describe the full list in the message field.",
  },
  {
    question: "How do I send a bulk order inquiry?",
    answer: `Fill the corporate form on this page. It prepares an email to ${company.email} with your company details, quantity, and product interest.`,
  },
];

export default function CorporatePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Corporate", path: "/corporate" },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      <section className="bg-bg-deep text-white">
        <div className="container-page py-20 lg:py-24">
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-white/55">
            Corporate
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Product &amp; bulk orders for companies
          </h1>
          <p className="mt-5 max-w-2xl text-white/70 leading-relaxed">
            Need fixtures for a project or a wholesale quantity? Use the corporate form below — Fiam Pakistan
            will follow up on product specs, availability, and bulk quotations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#corporate-form"
              className="inline-flex bg-accent px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white hover:bg-accent-deep"
            >
              Open order form
            </a>
            <Link
              href="/products"
              className="inline-flex border border-white/35 px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white hover:bg-white hover:text-ink transition-colors"
            >
              Browse catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page section-pad grid gap-6 md:grid-cols-3">
        {benefits.map((item) => (
          <div key={item.title} className="border border-line bg-white p-7">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h2>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-bg-muted border-y border-line">
        <div className="container-page py-10 flex flex-wrap gap-3">
          <span className="w-full mb-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-ink-soft">
            Categories available for corporate supply
          </span>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="border border-line bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase hover:border-accent hover:text-accent transition-colors"
            >
              {cat.shortName}
            </Link>
          ))}
        </div>
      </section>

      <section id="corporate-form" className="container-page section-pad grid gap-12 lg:grid-cols-[0.85fr_1.15fr] scroll-mt-28">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Tell us what you need
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Submit a product inquiry or bulk order request. Include quantity, city, and preferred models so we
            can prepare an accurate quotation.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <p className="text-ink-soft">Corporate email</p>
              <a href={`mailto:${company.email}`} className="mt-1 block text-lg font-medium hover:text-accent">
                {company.email}
              </a>
            </li>
            <li>
              <p className="text-ink-soft">Website</p>
              <a href={company.url} className="mt-1 block font-medium hover:text-accent">
                fiam.com.pk
              </a>
            </li>
          </ul>
          <div className="mt-10 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <CorporateOrderForm />
      </section>
    </>
  );
}
