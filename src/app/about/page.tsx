import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/products";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Fiam Pakistan",
  description:
    "Pak Burma Traders is the exclusive importer of FIAM Lighting in Pakistan — commercial, decorative, outdoor, and LED lighting since 2002. Contact info@fiam.com.pk.",
  path: "/about",
  keywords: [
    "about Fiam Pakistan",
    "Pak Burma Traders",
    "FIAM Lighting Pakistan",
    "fiam.com.pk",
  ],
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
          <p data-anim="fade" className="text-[12px] font-semibold tracking-[0.22em] uppercase text-white/55">
            About us
          </p>
          <h1 data-anim="lines" className="mt-4 max-w-3xl font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Exclusive FIAM Lighting importer for Pakistan
          </h1>
          <dl data-anim="stagger" data-delay="0.3" className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/15 pt-6">
            <div>
              <dt className="text-sm text-white/55">Founded</dt>
              <dd className="mt-1 text-4xl font-semibold tabular-nums">
                1980
              </dd>
            </div>
            <div>
              <dt className="text-sm text-white/55">FIAM partner since</dt>
              <dd className="mt-1 text-4xl font-semibold tabular-nums">
                2002
              </dd>
            </div>
            <div>
              <dt className="text-sm text-white/55">Brands</dt>
              <dd className="mt-1 text-4xl font-semibold tabular-nums">
                <span data-anim="count" data-value={company.brands.length}>{company.brands.length}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="container-page section-pad grid gap-12 lg:grid-cols-2">
        <div>
          <h2 data-anim="lines" className="font-display text-3xl font-semibold tracking-tight">Who we are</h2>
          <p data-anim="fade" className="mt-5 text-ink-soft leading-relaxed">{company.about}</p>
          <p data-anim="fade" className="mt-4 text-ink-soft leading-relaxed">{company.companyGroup}</p>

          <h3 data-anim="lines" className="mt-10 font-display text-2xl font-semibold tracking-tight">Our brands</h3>
          <p data-anim="fade" className="mt-3 text-sm leading-relaxed text-ink-soft">
            Fiam is a nationwide brand with distributors across Pakistan. Product lines are organised under
            four brands for clearer category focus.
          </p>
          <ul data-anim="stagger" className="mt-6 grid gap-4 sm:grid-cols-2">
            {company.brands.map((brand) => (
              <li key={brand.name}>
                <p className="text-sm font-semibold text-ink">{brand.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{brand.focus}</p>
              </li>
            ))}
          </ul>
        </div>

        <div data-anim="fade" className="self-start border border-line bg-white p-8 lg:p-10">
          <h3 className="font-display text-2xl font-semibold">Company facts</h3>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-ink-soft">Legal name</dt>
              <dd className="mt-1 font-medium">{company.legalName}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Brand</dt>
              <dd className="mt-1 font-medium">{company.brandName}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Address</dt>
              <dd className="mt-1 font-medium">{company.address}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Hours</dt>
              <dd className="mt-1 font-medium">{company.hours}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Phone</dt>
              <dd className="mt-1 font-medium">
                <a href={`tel:${company.phoneTel}`} className="hover:text-accent">
                  {company.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">Email</dt>
              <dd className="mt-1 font-medium">
                <a href={`mailto:${company.email}`} className="hover:text-accent">
                  {company.email}
                </a>
              </dd>
              <dd className="mt-1 font-medium">
                <a href={`mailto:${company.altEmail}`} className="hover:text-accent">
                  {company.altEmail}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex bg-accent px-6 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase text-white hover:bg-accent-deep"
            >
              Contact us
            </Link>
            <Link
              href="/stores"
              className="inline-flex border border-line px-6 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase text-ink hover:border-ink"
            >
              Store locations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
