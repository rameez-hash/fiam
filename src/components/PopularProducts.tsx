import Link from "next/link";
import { getShowcaseProducts } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

export function PopularProducts() {
  const items = getShowcaseProducts(8);

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="mb-10 max-w-xl">
          <h2 data-anim="lines" className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Popular products
          </h2>
          <p data-anim="fade" className="mt-2 text-ink-soft">
            Frequently requested fixtures from our commercial, outdoor, and decorative lines.
          </p>
        </div>

        <div data-anim="stagger" className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div data-anim="fade" className="mt-10">
          <Link
            href="/products"
            className="inline-flex border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-white transition-colors"
          >
            Browse full catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
