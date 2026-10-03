import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Shop LED Products & Fixtures",
  description:
    "Shop Fiam Pakistan LED catalog: commercial LED, GU10/MR16 modules, outdoor step lights, and decorative lighting panels.",
  path: "/products",
  keywords: ["Fiam Pakistan shop", "LED products", "lighting fixtures catalog"],
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/products" },
        ])}
      />
      <section className="bg-bg-deep text-white">
        <div className="container-page flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-anim="fade" className="text-sm text-white/60">
              Shop
            </p>
            <h1 data-anim="lines" className="mt-3 text-5xl sm:text-6xl font-semibold tracking-tight">
              Products
            </h1>
            <p data-anim="fade" data-delay="0.15" className="mt-5 max-w-2xl text-white/70 leading-relaxed">
              Browse commercial LED, modules, outdoor, and decorative fixtures from Fiam Pakistan —
              ready for project specification and bulk orders.
            </p>
          </div>
          <p data-anim="fade" data-delay="0.25" className="text-sm text-white/60">
            <span data-anim="count" data-value={products.length} className="text-5xl font-semibold text-white tabular-nums">
              {products.length}
            </span>{" "}
            models
          </p>
        </div>
      </section>

      <section data-anim="stagger" className="container-page py-10 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="border border-line bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase hover:border-accent hover:text-accent transition-colors"
          >
            {cat.shortName}
          </Link>
        ))}
      </section>

      <section className="container-page pb-20">
        <div data-anim="stagger" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
