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

      <section className="border-b border-line bg-bg-deep text-white">
        <div className="container-page py-16 sm:py-20">
          <p data-anim="fade" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Store locator
          </p>
          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 data-anim="lines" className="text-4xl font-semibold tracking-tight sm:text-6xl">
                Find Fiam near you
              </h1>
              <p data-anim="fade" data-delay="0.15" className="mt-4 max-w-xl leading-relaxed text-white/70">
                Retail partners across Pakistan. Search by city, area, store name, or phone, then call
                or get directions.
              </p>
            </div>

            <dl data-anim="stagger" className="grid grid-cols-2 gap-8 lg:min-w-[240px]">
              <div>
                <dt className="text-sm text-white/50">Stores</dt>
                <dd className="mt-1 text-4xl font-semibold tabular-nums sm:text-5xl">
                  <span data-anim="count" data-value={total}>
                    {total}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/50">Cities</dt>
                <dd className="mt-1 text-4xl font-semibold tabular-nums sm:text-5xl">
                  <span data-anim="count" data-value={storeCities.length}>
                    {storeCities.length}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div data-anim="fade" data-delay="0.25" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
            <a href={`mailto:${storeContact.email}`} className="transition-colors hover:text-white">
              {storeContact.email}
            </a>
            <a href={`tel:${storeContact.phoneTel}`} className="transition-colors hover:text-white">
              {storeContact.phone}
            </a>
          </div>
        </div>
      </section>

      <StoreLocator />

      <section className="border-t border-line bg-white">
        <div className="container-page py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 data-anim="lines" className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Need help finding a dealer?
              </h2>
              <p data-anim="fade" className="mt-3 text-sm leading-relaxed text-ink-soft">
                Contact Fiam Pakistan and we will guide you to the right store or arrange a corporate
                quotation.
              </p>
            </div>
            <div data-anim="fade" className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-deep"
              >
                Contact us
              </Link>
              <Link
                href="/corporate"
                className="inline-flex border border-ink px-5 py-2.5 text-sm font-medium hover:bg-ink hover:text-white"
              >
                Corporate / bulk order
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
