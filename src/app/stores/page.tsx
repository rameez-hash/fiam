import type { Metadata } from "next";
import Link from "next/link";
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
        <div className="container-page py-16 sm:py-20">
          <p className="text-sm text-white/60">Store locator</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">Our store locations</h1>
          <p className="mt-4 max-w-2xl text-white/70 leading-relaxed">
            {total} retail partners across Pakistan. Call a nearby store or contact Fiam Pakistan for
            dealer support.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${storeContact.email}`} className="text-white hover:text-accent">
              {storeContact.email}
            </a>
            <a href={`tel:${storeContact.phoneTel}`} className="text-white hover:text-accent">
              {storeContact.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="container-page section-pad">
        <div className="mb-8 flex flex-wrap gap-2">
          {storeCities.map((city) => (
            <a
              key={city.city}
              href={`#${city.city.toLowerCase()}`}
              className="border border-line bg-white px-3 py-1.5 text-sm hover:border-accent hover:text-accent transition-colors"
            >
              {city.city}
            </a>
          ))}
        </div>

        <div className="space-y-12">
          {storeCities.map((city) => (
            <div key={city.city} id={city.city.toLowerCase()} className="scroll-mt-28">
              <h2 className="border-b border-line pb-3 text-2xl font-semibold tracking-tight">
                {city.city}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {city.stores.map((store) => (
                  <article
                    key={`${city.city}-${store.name}-${store.address}`}
                    className="border border-line bg-white p-5"
                  >
                    <h3 className="text-base font-semibold text-ink">{store.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{store.address}</p>
                    <ul className="mt-3 space-y-1">
                      {store.phones.map((phone) => (
                        <li key={phone}>
                          <a
                            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                            className="text-sm font-medium text-accent hover:text-accent-deep"
                          >
                            {phone}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-line bg-bg-muted p-6 sm:p-8">
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
