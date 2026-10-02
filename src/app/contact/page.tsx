import type { Metadata } from "next";
import { company } from "@/data/products";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Fiam Pakistan",
  description:
    "Contact Fiam Pakistan for LED product specifications, samples, and project quotations. Email info@fiam.com.pk.",
  path: "/contact",
  keywords: ["contact Fiam Pakistan", "LED lighting quote", "info@fiam.com.pk"],
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
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-white/55">Contact us</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Let&apos;s light your next project
          </h1>
        </div>
      </section>

      <section className="container-page section-pad grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold">Reach the team</h2>
          <ul className="mt-8 space-y-5 text-sm">
            <li>
              <p className="text-ink-soft">Email</p>
              <a href={`mailto:${company.email}`} className="mt-1 block text-lg font-medium hover:text-accent">
                {company.email}
              </a>
            </li>
            <li>
              <p className="text-ink-soft">Phone</p>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="mt-1 block text-lg font-medium hover:text-accent">
                {company.phone}
              </a>
              <a href={`tel:${company.mobile.replace(/\s/g, "")}`} className="mt-1 block hover:text-accent">
                {company.mobile}
              </a>
            </li>
            <li>
              <p className="text-ink-soft">Fax</p>
              <p className="mt-1 font-medium">{company.fax}</p>
            </li>
            <li>
              <p className="text-ink-soft">Addresses</p>
              <p className="mt-1 leading-relaxed">{company.address}</p>
              <p className="mt-2 leading-relaxed">{company.address2}</p>
            </li>
          </ul>
        </div>

        <form className="border border-line bg-white p-8 lg:p-10 grid gap-5">
          <h2 className="font-display text-2xl font-semibold">Send a message</h2>
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Name</span>
            <input
              name="name"
              required
              className="border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Email</span>
            <input
              type="email"
              name="email"
              required
              className="border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Company / Project</span>
            <input
              name="company"
              className="border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              className="border border-line bg-bg px-4 py-3 outline-none focus:border-accent resize-y"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex justify-center bg-accent px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white hover:bg-accent-deep"
          >
            Submit inquiry
          </button>
          <p className="text-xs text-ink-soft">
            This demo form is front-end only. Wire it to your CRM or email endpoint for production.
          </p>
        </form>
      </section>
    </>
  );
}
