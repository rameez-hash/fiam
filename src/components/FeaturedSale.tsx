import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function FeaturedSale() {
  const items = getFeaturedProducts().slice(0, 4);

  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Featured fixtures</h2>
          <p className="mt-2 text-ink-soft">
            Selected models from commercial, module, outdoor, and decorative ranges.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/contact" className="text-sm font-medium text-ink link-underline">
            Request a quotation
          </Link>
        </div>
      </div>
    </section>
  );
}
