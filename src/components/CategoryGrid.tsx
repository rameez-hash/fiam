import Image from "next/image";
import Link from "next/link";
import { countProducts, nodeImage, topCategories } from "@/data/catalog";

const categoryCovers: Record<string, string> = {
  "commercial-led-light": "/categories/commercial-led-light-v3.jpg",
  "fixtures-led-module": "/categories/fixtures-module-v5.jpg",
  "outdoor-light": "/categories/outdoor-light-v2.jpg",
  "decorative-lighting": "/categories/decorative-lighting-v2.jpg",
};

export function CategoryGrid() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 data-anim="lines" className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Product ranges
            </h2>
            <p data-anim="fade" className="mt-2 text-ink-soft">
              Four main lines for commercial and outdoor work.
            </p>
          </div>
          <Link
            data-anim="fade"
            href="/products"
            className="text-sm font-medium text-ink link-underline self-start md:self-auto"
          >
            See all products
          </Link>
        </div>

        <div data-anim="stagger" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topCategories.map((cat, i) => {
            const src = categoryCovers[cat.slug] || nodeImage(cat);
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative min-h-[380px] overflow-hidden bg-bg-deep text-white lg:min-h-[420px]"
              >
                <Image
                  src={src}
                  alt={cat.name}
                  fill
                  quality={92}
                  sizes="(max-width:1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
                <span className="absolute inset-x-5 top-5 z-[1] flex justify-between text-xs tabular-nums text-white/70">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{countProducts(cat)} models</span>
                </span>
                <div className="absolute inset-x-0 bottom-0 z-[1] p-5">
                  <h3 className="text-xl font-semibold leading-snug">{cat.name}</h3>
                  <p className="mt-2 text-sm text-white/75 line-clamp-2">{cat.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 border border-white/35 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:border-white group-hover:bg-white group-hover:text-ink">
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
