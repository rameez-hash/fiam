import Link from "next/link";
import { getPopularProducts } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function PopularProducts() {
  const items = getPopularProducts().slice(0, 8);

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-accent">Seasonal picks</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            We make atmosphere
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Popular products from Fiam Pakistan commercial LED, outdoor, module, and decorative
            collections — specified by lighting professionals.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex border border-ink px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase hover:bg-ink hover:text-white transition-colors"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
