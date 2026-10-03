"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { storeCities } from "@/data/stores";
import { Highlight, matchesAll, tokenize, writeParams } from "@/lib/search";

gsap.registerPlugin(useGSAP);

const ALL = "";

function mapsUrl(name: string, address: string, city: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name}, ${address}, ${city}, Pakistan`
  )}`;
}

export function StoreLocator() {
  return (
    <Suspense fallback={<StoreLocatorView initialQuery="" initialCity={ALL} />}>
      <StoreLocatorFromUrl />
    </Suspense>
  );
}

function StoreLocatorFromUrl() {
  const params = useSearchParams();
  const cityParam = params.get("city") ?? "";
  const initialCity = storeCities.some((c) => c.city === cityParam) ? cityParam : ALL;
  return <StoreLocatorView initialQuery={params.get("q") ?? ""} initialCity={initialCity} />;
}

function StoreLocatorView({ initialQuery, initialCity }: { initialQuery: string; initialCity: string }) {
  const [query, setQueryState] = useState(initialQuery);
  const [city, setCityState] = useState(initialCity);
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const setQuery = (value: string) => {
    setQueryState(value);
    writeParams({ q: value.trim(), city });
  };
  const setCity = (value: string) => {
    setCityState(value);
    writeParams({ q: query.trim(), city: value });
  };

  const total = storeCities.reduce((n, c) => n + c.stores.length, 0);
  const tokens = useMemo(() => tokenize(deferredQuery), [deferredQuery]);

  const queryMatches = useMemo(
    () =>
      storeCities.map((c) => ({
        city: c.city,
        stores: c.stores.filter((s) =>
          matchesAll(`${s.name} ${s.address} ${c.city}`, tokens, s.phones)
        ),
      })),
    [tokens]
  );

  const results = queryMatches.filter((c) => c.stores.length > 0 && (city === ALL || c.city === city));
  const shown = results.reduce((n, c) => n + c.stores.length, 0);
  const countFor = (name: string) => queryMatches.find((c) => c.city === name)?.stores.length ?? 0;
  const matchedTotal = queryMatches.reduce((n, c) => n + c.stores.length, 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-store-card]",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.035, overwrite: true }
      );
    },
    { dependencies: [tokens.join(" "), city], scope: resultsRef }
  );

  const clear = () => {
    setQueryState("");
    setCityState(ALL);
    writeParams({ q: "", city: ALL });
    inputRef.current?.focus();
  };

  const summary = (() => {
    const where = city ? ` in ${city}` : "";
    const what = deferredQuery.trim() ? ` for “${deferredQuery.trim()}”` : "";
    return `${shown} of ${total} stores${where}${what}`;
  })();

  return (
    <section className="container-page section-pad">
      <div className="border border-line bg-white p-4 sm:p-6">
        <label htmlFor="store-search" className="text-sm font-medium text-ink">
          Find a store
        </label>
        <div className="relative mt-3">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4.2-4.2" />
          </svg>
          <input
            ref={inputRef}
            id="store-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQuery("");
            }}
            placeholder="City, area, store name or phone — e.g. Clifton, DHA, 042"
            autoComplete="off"
            className="w-full border border-line bg-bg py-4 pl-12 pr-24 text-base outline-none transition-colors placeholder:text-ink-soft/70 focus:border-ink [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-ink-soft hover:text-ink"
            >
              Clear
            </button>
          ) : (
            <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 border border-line bg-white px-2 py-0.5 text-xs text-ink-soft sm:block">
              /
            </kbd>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by city">
          <button
            type="button"
            onClick={() => setCity(ALL)}
            aria-pressed={city === ALL}
            className={`border px-3 py-1.5 text-sm transition-colors ${
              city === ALL ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"
            }`}
          >
            All <span className="tabular-nums opacity-60">{matchedTotal}</span>
          </button>
          {storeCities.map((c) => {
            const n = countFor(c.city);
            const active = city === c.city;
            return (
              <button
                key={c.city}
                type="button"
                onClick={() => setCity(active ? ALL : c.city)}
                aria-pressed={active}
                disabled={n === 0 && !active}
                className={`border px-3 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
                  active ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"
                }`}
              >
                {c.city} <span className="tabular-nums opacity-60">{n}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft" aria-live="polite">
        {summary}
      </p>

      <div ref={resultsRef} className="mt-6 space-y-12">
        {results.map((group) => (
          <div key={group.city}>
            <h2 className="flex items-baseline justify-between border-b border-line pb-3 text-2xl font-semibold tracking-tight">
              {group.city}
              <span className="text-sm font-normal text-ink-soft tabular-nums">
                {group.stores.length} {group.stores.length === 1 ? "store" : "stores"}
              </span>
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.stores.map((store) => (
                <article
                  key={`${group.city}-${store.name}-${store.address}`}
                  data-store-card
                  className="group flex flex-col border border-line bg-white p-5 transition-colors hover:border-ink/40"
                >
                  <h3 className="text-base font-semibold text-ink">
                    <Highlight text={store.name} tokens={tokens} />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    <Highlight text={store.address} tokens={tokens} />
                  </p>
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
                  <div className="mt-auto flex gap-4 border-t border-line pt-4 text-sm font-medium">
                    <a
                      href={`tel:${store.phones[0].replace(/[^\d+]/g, "")}`}
                      className="text-ink hover:text-accent"
                    >
                      Call
                    </a>
                    <a
                      href={mapsUrl(store.name, store.address, group.city)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-accent"
                    >
                      Directions ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}

        {shown === 0 && (
          <div className="border border-dashed border-line bg-white p-8 text-center">
            <p className="text-lg font-semibold text-ink">No store matches that search</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
              Try a city name, an area like DHA or Clifton, or part of a phone number. You can also
              contact us and we will point you to the nearest dealer.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={clear}
                className="border border-ink px-5 py-2.5 text-sm font-medium hover:bg-ink hover:text-white"
              >
                Show all stores
              </button>
              <Link
                href="/contact"
                className="bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-deep"
              >
                Contact us
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
