import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/products";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your message has been sent to Fiam Pakistan.",
  robots: { index: false, follow: true },
};

const variants = {
  contact: {
    eyebrow: "Message sent",
    title: "Thank you for reaching out",
    text: "Your message is with our team. We reply within 24 hours on working days.",
  },
  corporate: {
    eyebrow: "Request received",
    title: "Thank you for your corporate request",
    text: "Our corporate desk will review your project or bulk order and get back to you with product details or a quotation.",
  },
  newsletter: {
    eyebrow: "Subscribed",
    title: "Thank you for subscribing",
    text: "You will hear from us about product launches and project lighting tips.",
  },
} as const;

type Variant = keyof typeof variants;

export default async function ThankYouPage({ searchParams }: PageProps<"/thank-you">) {
  const { type } = await searchParams;
  const key: Variant = typeof type === "string" && type in variants ? (type as Variant) : "contact";
  const v = variants[key];

  return (
    <section className="relative isolate flex min-h-[72vh] flex-col justify-center overflow-hidden bg-bg-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(232,93,4,0.22),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(255,255,255,0.06),transparent_45%)]"
      />
      <div className="container-page relative py-24 sm:py-28">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent" aria-hidden>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-white/55">{v.eyebrow}</p>
        </div>

        <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold tracking-tight sm:text-6xl">
          {v.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">{v.text}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/products"
            className="inline-flex bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
          >
            Browse products
          </Link>
          <Link
            href="/"
            className="inline-flex border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
          >
            Back to home
          </Link>
        </div>

        <p className="mt-14 border-t border-white/15 pt-6 text-sm text-white/55">
          Need a faster answer? Call{" "}
          <a href={`tel:${company.phoneTel}`} className="text-white hover:text-accent">
            {company.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${company.email}`} className="text-white hover:text-accent">
            {company.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
