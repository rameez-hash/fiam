import Link from "next/link";
import { getShowcaseProducts } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

export function PopularProducts() {
  const items = getShowcaseProducts(8);

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p data-anim="fade" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Catalog picks
            </p>
            <h2
              data-anim="lines"
              className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight"
            >
              Popular products
            </h2>
            <p data-anim="fade" className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              Frequently requested fixtures from commercial, outdoor, and decorative lines.
            </p>
          </div>
          <Link
            data-anim="fade"
            href="/products"
            className="inline-flex self-start border border-ink px-6 py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-white md:self-auto"
          >
            Browse full catalog
          </Link>
        </div>

        <div data-anim="stagger" className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
