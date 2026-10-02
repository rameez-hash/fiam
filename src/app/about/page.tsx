import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/products";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Fiam Pakistan",
  description:
    "Learn about Fiam Pakistan — LED lighting for commercial, outdoor, and decorative projects across Pakistan. Contact info@fiam.com.pk.",
  path: "/about",
  keywords: ["about Fiam Pakistan", "fiam.com.pk", "LED lighting Pakistan"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <section className="bg-bg-deep text-white">
        <div className="container-page py-24">
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-white/55">About us</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Lighting professionals for spaces that need atmosphere and precision
          </h1>
        </div>
      </section>

      <section className="container-page section-pad grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">Who we are</h2>
          <p className="mt-5 text-ink-soft leading-relaxed">{company.description}</p>
          <p className="mt-4 text-ink-soft leading-relaxed">
            As {company.legalName}, we supply linear commercial systems, LED modules, outdoor step lights, and
            decorative panels with clear technical documentation for architects, contractors, and distributors.
          </p>
        </div>
        <div className="bg-white p-8 lg:p-10 border border-line">
          <h3 className="font-display text-2xl font-semibold">Company facts</h3>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-ink-soft">Legal name</dt>
              <dd className="mt-1 font-medium">{company.legalName}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">China</dt>
              <dd className="mt-1 font-medium">{company.address}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Hong Kong</dt>
              <dd className="mt-1 font-medium">{company.address2}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Email</dt>
              <dd className="mt-1 font-medium">{company.email}</dd>
            </div>
          </dl>
          <Link
            href="/contact"
            className="mt-8 inline-flex bg-accent px-6 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase text-white hover:bg-accent-deep"
          >
            Contact Fiam Pakistan
          </Link>
        </div>
      </section>
    </>
  );
}
