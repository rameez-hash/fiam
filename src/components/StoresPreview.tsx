import Link from "next/link";
import { storeCities, type Store } from "@/data/stores";

function mapsUrl(name: string, address: string, city: string, mapUrl?: string) {
  if (mapUrl) return mapUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name}, ${address}, ${city}, Pakistan`
  )}`;
}

function StoreLeaf({
  store,
  city,
  isLast,
}: {
  store: Store;
  city: string;
  isLast: boolean;
}) {
  return (
    <li className="relative pl-8 sm:pl-10">
      {/* branch from city trunk */}
      <span
        aria-hidden
        className={`absolute left-[11px] top-0 w-px bg-white/15 sm:left-[15px] ${isLast ? "h-6" : "inset-y-0"}`}
      />
      <span aria-hidden className="absolute left-[11px] top-6 h-px w-5 bg-white/15 sm:left-[15px] sm:w-6" />
      <span
        aria-hidden
        className="absolute left-[28px] top-[19px] h-2 w-2 rounded-full bg-accent sm:left-[35px]"
      />

      <article className="grid gap-4 rounded-sm border border-white/10 bg-white/[0.03] px-4 py-4 transition-colors hover:border-accent/40 hover:bg-white/[0.05] sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:px-5">
        <div className="min-w-0">
          <h4 className="font-[family-name:var(--font-rethink)] text-base font-semibold text-white sm:text-lg">
            {store.name}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-white/55">{store.address}</p>
          <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
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
    </li>
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
              {total} retail partners across {storeCities.length} cities in Pakistan. Browse the tree by
              city, then call or get directions.
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

        <div data-anim="stagger" className="relative mt-12 max-w-4xl">
          {/* main trunk */}
          <span
            aria-hidden
            className="absolute bottom-8 left-[11px] top-3 w-px bg-gradient-to-b from-accent via-white/20 to-transparent sm:left-[15px]"
          />

          <ul className="space-y-10">
            {storeCities.map((group, cityIndex) => {
              const isLastCity = cityIndex === storeCities.length - 1;
              return (
                <li key={group.city} className="relative">
                  <div className="relative flex items-center gap-3 pl-0">
                    <span
                      aria-hidden
                      className="relative z-[1] flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-[#111] text-accent shadow-[0_0_20px_rgba(232,93,4,0.35)] sm:h-8 sm:w-8"
                    >
                      <span className="h-2 w-2 rounded-full bg-accent" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{group.city}</h3>
                      <p className="text-sm tabular-nums text-white/45">
                        {group.stores.length} {group.stores.length === 1 ? "store" : "stores"}
                      </p>
                    </div>
                  </div>

                  <ul className={`mt-4 space-y-3 ${isLastCity ? "" : ""}`}>
                    {group.stores.map((store, i) => (
                      <StoreLeaf
                        key={`${group.city}-${store.name}-${store.address}`}
                        store={store}
                        city={group.city}
                        isLast={i === group.stores.length - 1}
                      />
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
