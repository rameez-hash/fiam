import Link from "next/link";
import { getPopularProducts } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function PopularProducts() {
  const items = getPopularProducts().slice(0, 8);

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Popular products</h2>
          <p className="mt-2 text-ink-soft">
            Frequently requested fixtures from our commercial, outdoor, and decorative lines.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10">
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
