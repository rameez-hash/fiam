import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="section-pad">
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
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative min-h-[340px] overflow-hidden bg-bg-deep text-white"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width:1024px) 50vw, 25vw"
                className="object-cover opacity-50 transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <span className="absolute left-5 top-5 text-xs tabular-nums text-white/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl font-semibold leading-snug">{cat.name}</h3>
                <p className="mt-2 text-sm text-white/70 line-clamp-2">{cat.description}</p>
                <span className="mt-4 flex items-center gap-2 text-sm font-medium text-white/80">
                  <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-12" aria-hidden />
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
