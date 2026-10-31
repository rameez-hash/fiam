import Link from "next/link";
import { storeCities, type Store } from "@/data/stores";

function mapsUrl(name: string, address: string, city: string, mapUrl?: string) {
  if (mapUrl) return mapUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name}, ${address}, ${city}, Pakistan`
  )}`;
}

function StoreRow({ store, city }: { store: Store; city: string }) {
  return (
    <article className="grid gap-4 px-4 py-5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:px-6">
      <div className="min-w-0">
        <div className="flex items-start gap-3">
          <span
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-white/15 text-accent"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-white sm:text-lg">{store.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/55">{store.address}</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {store.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="text-sm font-medium text-white transition-colors hover:text-accent"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 sm:justify-end">
        <a
          href={`tel:${store.phones[0].replace(/[^\d+]/g, "")}`}
          className="inline-flex bg-accent px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-deep"
        >
          Call
        </a>
        <a
          href={mapsUrl(store.name, store.address, city, store.mapUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex border border-white/30 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-ink"
        >
          Directions
        </a>
      </div>
    </article>
  );
}

export function StoresPreview() {
  const total = storeCities.reduce((n, c) => n + c.stores.length, 0);

  return (
    <section className="border-y border-line bg-bg-deep text-white">
      <div className="container-page section-pad">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p data-anim="fade" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Store locator
            </p>
            <h2
              data-anim="lines"
              className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight"
            >
              Find a Fiam store near you
            </h2>
            <p data-anim="fade" className="mt-4 text-[15px] leading-relaxed text-white/65">
              {total} retail partners across {storeCities.length} cities in Pakistan. Call a store or get
              directions below.
            </p>
          </div>
          <Link
            data-anim="fade"
            href="/stores"
            className="inline-flex self-start bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep lg:self-auto"
          >
            Search stores
          </Link>
        </div>

        <div data-anim="stagger" className="mt-12 space-y-12">
          {storeCities.map((group) => (
            <div key={group.city}>
              <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-3">
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{group.city}</h3>
                <p className="text-sm tabular-nums text-white/45">
                  {group.stores.length} {group.stores.length === 1 ? "store" : "stores"}
                </p>
              </div>
              <div className="mt-0 divide-y divide-white/10 border-b border-white/10">
                {group.stores.map((store) => (
                  <StoreRow
                    key={`${group.city}-${store.name}-${store.address}`}
                    store={store}
                    city={group.city}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
