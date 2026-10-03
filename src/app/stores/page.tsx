import type { Metadata } from "next";
import Link from "next/link";
import { StoreLocator } from "@/components/StoreLocator";
import { storeCities, storeContact } from "@/data/stores";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Store Locations",
  description:
    "Find Fiam Lighting Pakistan stores and dealers in Karachi, Lahore, Islamabad, Multan, Faisalabad, Peshawar, Rawalpindi, and Hyderabad.",
  path: "/stores",
  keywords: [
    "Fiam store locator",
    "Fiam lights Karachi",
    "Fiam lights Lahore",
    "LED store Pakistan",
  ],
});

export default function StoresPage() {
  const total = storeCities.reduce((n, c) => n + c.stores.length, 0);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
        ])}
      />

      <section className="bg-bg-deep text-white">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p data-anim="fade" className="text-sm text-white/60">
              Store locator
            </p>
            <h1 data-anim="lines" className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tight">
              Find Fiam near you
            </h1>
            <p data-anim="fade" data-delay="0.15" className="mt-4 max-w-xl text-white/70 leading-relaxed">
              Retail partners across Pakistan. Search by city, area, or store name — then call ahead or
              get directions.
            </p>
            <div data-anim="fade" data-delay="0.25" className="mt-6 flex flex-wrap gap-4 text-sm">
              <a href={`mailto:${storeContact.email}`} className="text-white hover:text-accent">
                {storeContact.email}
              </a>
              <a href={`tel:${storeContact.phoneTel}`} className="text-white hover:text-accent">
                {storeContact.phone}
              </a>
            </div>
          </div>

          <dl data-anim="stagger" data-delay="0.2" className="grid grid-cols-2 gap-6 border-t border-white/15 pt-6 lg:border-0 lg:pt-0">
            <div>
              <dt className="text-sm text-white/55">Stores</dt>
              <dd className="mt-1 text-5xl font-semibold tabular-nums">
                <span data-anim="count" data-value={total}>
                  {total}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-white/55">Cities</dt>
              <dd className="mt-1 text-5xl font-semibold tabular-nums">
                <span data-anim="count" data-value={storeCities.length}>
                  {storeCities.length}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <StoreLocator />

      <section className="container-page pb-20">
        <div data-anim="fade" className="border border-line bg-bg-muted p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Need help finding a dealer?</h2>
          <p className="mt-2 max-w-xl text-sm text-ink-soft leading-relaxed">
            Contact Fiam Pakistan and we will guide you to the right store or arrange a corporate
            quotation.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-deep"
            >
              Contact us
            </Link>
            <Link
              href="/corporate"
              className="inline-flex border border-line bg-white px-5 py-2.5 text-sm font-medium hover:border-ink"
            >
              Corporate / bulk order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
