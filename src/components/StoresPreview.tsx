import Link from "next/link";
import { storeCities } from "@/data/stores";

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
              {total} retail partners across {storeCities.length} cities in Pakistan. Search by city,
              area, or store name.
            </p>
          </div>
          <Link
            data-anim="fade"
            href="/stores"
            className="inline-flex self-start bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep lg:self-auto"
          >
            Open store locator
          </Link>
        </div>

        <ul
          data-anim="stagger"
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4"
        >
          {storeCities.map((city) => (
            <li key={city.city}>
              <Link
                href={`/stores?city=${encodeURIComponent(city.city)}`}
                className="flex h-full flex-col justify-between bg-bg-deep px-5 py-5 transition-colors hover:bg-white/[0.04]"
              >
                <span className="text-base font-semibold tracking-tight">{city.city}</span>
                <span className="mt-6 text-sm tabular-nums text-white/50">
                  {city.stores.length} {city.stores.length === 1 ? "store" : "stores"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
