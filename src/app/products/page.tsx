import type { Metadata } from "next";
import Link from "next/link";
import { NodeCard } from "@/components/NodeCard";
import { catalogProducts, getChildren, topCategories } from "@/data/catalog";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products — FIAM LED Lighting Catalog",
  description:
    "The complete FIAM lighting catalog in Pakistan: commercial LED downlights, track and linear lights, LED module fixtures, outdoor luminaires and decorative lighting.",
  path: "/products",
  keywords: ["FIAM products", "LED lighting catalog Pakistan", "downlights", "track lights", "decorative lighting"],
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <section className="bg-bg-deep text-white">
        <div className="container-page flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-anim="fade" className="text-sm text-white/60">
              FIAM catalog
            </p>
            <h1 data-anim="lines" className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">
              Products
            </h1>
            <p data-anim="fade" data-delay="0.15" className="mt-5 max-w-2xl leading-relaxed text-white/70">
              Every FIAM series, from recessed downlights and track systems to outdoor and decorative
              luminaires. Open a series to see each model with full technical data.
            </p>
          </div>
          <p data-anim="fade" data-delay="0.25" className="text-sm text-white/60">
            <span
              data-anim="count"
              data-value={catalogProducts.length}
              className="text-5xl font-semibold tabular-nums text-white"
            >
              {catalogProducts.length}
            </span>{" "}
            models
          </p>
        </div>
      </section>

      <nav data-anim="stagger" className="container-page flex flex-wrap gap-3 py-10" aria-label="Categories">
        {topCategories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.slug}`}
            className="border border-line bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent"
          >
            {cat.shortName}
          </a>
        ))}
      </nav>

      {topCategories.map((cat) => {
        const series = getChildren(cat);
        return (
          <section key={cat.id} id={cat.slug} className="container-page scroll-mt-24 pb-20">
            <div className="mb-8 flex flex-col gap-3 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 data-anim="lines" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {cat.name}
                </h2>
                <p data-anim="fade" className="mt-2 max-w-2xl text-ink-soft">
                  {cat.description}
                </p>
              </div>
              <Link
                href={`/categories/${cat.slug}`}
                className="self-start text-sm font-medium text-ink link-underline md:self-auto"
              >
                View {cat.shortName.toLowerCase()} range
              </Link>
            </div>
            <div data-anim="stagger" className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {series.map((node) => (
                <NodeCard key={node.id} node={node} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
