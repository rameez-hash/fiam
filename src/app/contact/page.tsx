import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { company } from "@/data/products";
import { contactPageKeywords } from "@/data/seo-keywords";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Fiam Pakistan | Buy LED Lights Online & Get a Quote",
  description:
    "Contact Fiam Pakistan to buy LED lights online, request ceiling, pendant, outdoor, or commercial lighting quotes anywhere in Pakistan. Call +92 321 8208116 or email info@fiam.com.pk.",
  path: "/contact",
  keywords: contactPageKeywords(),
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <section className="bg-bg-deep text-white">
        <div className="container-page py-24">
          <p data-anim="fade" className="text-[12px] font-semibold tracking-[0.22em] uppercase text-white/55">
            Contact us
          </p>
          <h1 data-anim="lines" className="mt-4 font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Let&apos;s light your next project
          </h1>
        </div>
      </section>

      <section className="container-page section-pad grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 data-anim="lines" className="font-display text-3xl font-semibold">Reach the team</h2>
          <p data-anim="fade" className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            Have a question? Send a message and we will respond within 24 hours.
          </p>
          <ul data-anim="stagger" className="mt-8 space-y-5 text-sm">
            <li>
              <p className="text-ink-soft">Email</p>
              <a href={`mailto:${company.email}`} className="mt-1 block text-lg font-medium hover:text-accent">
                {company.email}
              </a>
            </li>
            <li>
              <p className="text-ink-soft">Phone</p>
              <a
                href={`tel:${company.phoneTel}`}
                className="mt-1 block text-lg font-medium hover:text-accent"
              >
                {company.phone}
              </a>
            </li>
            <li>
              <p className="text-ink-soft">Hours</p>
              <p className="mt-1 font-medium">{company.hours}</p>
            </li>
            <li>
              <p className="text-ink-soft">Stores</p>
              <Link href="/stores" className="mt-1 inline-block text-lg font-medium hover:text-accent">
                View store locations
              </Link>
            </li>
          </ul>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
