import Image from "next/image";
import Link from "next/link";
import { categoryCoverImage, countProducts, topCategories } from "@/data/catalog";

export function CategoryGrid() {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/10 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#121212_42%,#0b0b0b_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_12%_-10%,rgba(232,93,4,0.28),transparent_55%),radial-gradient(ellipse_55%_45%_at_88%_18%,rgba(255,140,50,0.1),transparent_50%),radial-gradient(ellipse_70%_50%_at_50%_110%,rgba(232,93,4,0.12),transparent_55%)]"
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
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p data-anim="fade" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Catalog
            </p>
            <h2
              data-anim="lines"
              className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight"
            >
              Product ranges
            </h2>
            <p data-anim="fade" className="mt-3 text-[15px] leading-relaxed text-white/60">
              Four main lines for commercial, outdoor, and decorative work across Pakistan.
            </p>
          </div>
          <Link
            data-anim="fade"
            href="/products"
            className="self-start text-sm font-medium text-white/70 transition-colors hover:text-accent md:self-auto"
          >
            See all products →
          </Link>
        </div>

        <div data-anim="stagger" className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {topCategories.map((cat, i) => {
            const src = categoryCoverImage(cat);
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative min-h-[400px] overflow-hidden border border-accent/80 bg-black text-white shadow-[0_0_0_1px_rgba(232,93,4,0.15)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_50px_rgba(0,0,0,0.45),0_0_0_1px_rgba(232,93,4,0.55)] lg:min-h-[460px]"
              >
                <Image
                  src={src}
                  alt={cat.name}
                  fill
                  quality={92}
                  sizes="(max-width:1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(232,93,4,0.16),transparent_42%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute inset-x-5 top-5 z-[1] flex justify-between text-[11px] font-semibold uppercase tracking-[0.14em]">
                  <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tabular-nums text-white/70">{countProducts(cat)} models</span>
                </span>

                <div className="absolute inset-x-0 bottom-0 z-[1] p-5 sm:p-6">
                  <h3 className="font-[family-name:var(--font-rethink)] text-[1.35rem] font-semibold leading-snug tracking-tight sm:text-xl">
                    {cat.name}
                  </h3>
                  <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-white/70 line-clamp-2">
                    {cat.description}
                  </p>
                  <span className="mt-6 inline-flex items-center bg-accent px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 group-hover:bg-accent-deep">
                    Explore
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
