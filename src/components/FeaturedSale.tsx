import Link from "next/link";
import { getShowcaseProducts } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

export function FeaturedSale() {
  const items = getShowcaseProducts(4, 3);

  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mb-10 max-w-xl">
          <h2 data-anim="lines" className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Featured fixtures
          </h2>
          <p data-anim="fade" className="mt-2 text-ink-soft">
            Selected models from commercial, module, outdoor, and decorative ranges.
          </p>
        </div>
        <div data-anim="stagger" className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div data-anim="fade" className="mt-8">
          <Link href="/contact" className="text-sm font-medium text-ink link-underline">
            Request a quotation
          </Link>
        </div>
      </div>
    </section>
  );
}
