import Image from "next/image";
import Link from "next/link";
import { categoryCoverImage, countProducts, topCategories } from "@/data/catalog";

export function CategoryGrid() {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/10 bg-bg-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(232,93,4,0.12),transparent_45%),radial-gradient(ellipse_at_90%_30%,rgba(255,255,255,0.04),transparent_40%)]"
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

        <div
          data-anim="stagger"
          className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
        >
          {topCategories.map((cat, i) => {
            const src = categoryCoverImage(cat);
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative min-h-[400px] overflow-hidden bg-bg-deep text-white lg:min-h-[460px]"
              >
                <Image
                  src={src}
                  alt={cat.name}
                  fill
                  quality={92}
                  sizes="(max-width:1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20 transition-opacity duration-500 group-hover:from-black group-hover:via-black/45" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute inset-x-5 top-5 z-[1] flex justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                  <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tabular-nums">{countProducts(cat)} models</span>
                </span>

                <div className="absolute inset-x-0 bottom-0 z-[1] p-5 sm:p-6">
                  <h3 className="text-[1.35rem] font-semibold leading-snug tracking-tight sm:text-xl">
                    {cat.name}
                  </h3>
                  <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-white/65 line-clamp-2">
                    {cat.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 border border-white/25 bg-white/0 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 group-hover:border-accent group-hover:bg-accent">
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
