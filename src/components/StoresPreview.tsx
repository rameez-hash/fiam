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
    <article className="grid gap-4 px-4 py-5 transition-colors hover:bg-white/[0.035] sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:px-6">
      <div className="min-w-0">
        <div className="flex items-start gap-3">
          <span
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-accent/40 bg-accent/10 text-accent"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </span>
          <div className="min-w-0">
            <h3 className="font-[family-name:var(--font-rethink)] text-base font-semibold text-white sm:text-lg">
              {store.name}
            </h3>
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
          className="inline-flex border border-white/30 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
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
    <section className="relative isolate overflow-hidden border-y border-white/10 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#131313_45%,#0b0b0b_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_85%_-8%,rgba(232,93,4,0.22),transparent_52%),radial-gradient(ellipse_60%_45%_at_8%_40%,rgba(255,140,50,0.08),transparent_48%),radial-gradient(ellipse_70%_45%_at_50%_115%,rgba(232,93,4,0.14),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <div className="container-page section-pad relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <p data-anim="fade" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Store locator
            </p>
            <h2
              data-anim="lines"
              className="mt-3 whitespace-nowrap text-[clamp(1.5rem,3.2vw,2.75rem)] font-semibold leading-tight tracking-tight"
            >
              Find a Fiam store near you
            </h2>
            <p data-anim="fade" className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
              {total} retail partners across {storeCities.length} cities in Pakistan. Call a store or get
              directions below.
            </p>
          </div>
          <Link
            data-anim="fade"
            href="/stores"
            className="inline-flex self-start bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(232,93,4,0.25)] transition-colors hover:bg-accent-deep lg:self-auto"
          >
            Search stores
          </Link>
        </div>

        <div data-anim="stagger" className="mt-12 space-y-10">
          {storeCities.map((group) => (
            <div
              key={group.city}
              className="overflow-hidden border border-white/10 bg-white/[0.02] shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
            >
              <div className="flex items-end justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-accent/10 via-transparent to-transparent px-4 pb-3 pt-4 sm:px-6">
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{group.city}</h3>
                <p className="text-sm tabular-nums text-white/45">
                  {group.stores.length} {group.stores.length === 1 ? "store" : "stores"}
                </p>
              </div>
              <div className="divide-y divide-white/10">
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
