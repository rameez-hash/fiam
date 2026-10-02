import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function FeaturedSale() {
  const items = getFeaturedProducts().slice(0, 4);

  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mb-12 max-w-2xl">
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-accent">Featured</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Featured fixtures worth specifying
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Highlighted Fiam Pakistan luminaires across commercial linear, modules, outdoor, and decorative series.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10">
          <Link href="/contact" className="text-[12px] font-semibold tracking-[0.16em] uppercase link-underline">
            Request a quotation
          </Link>
        </div>
      </div>
    </section>
  );
}
