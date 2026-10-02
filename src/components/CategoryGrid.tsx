import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-accent">Collections</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              Find the right light
            </h2>
          </div>
          <Link
            href="/products"
            className="text-[12px] font-semibold tracking-[0.16em] uppercase link-underline self-start md:self-auto"
          >
            Browse all products
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative min-h-[340px] overflow-hidden bg-bg-deep text-white"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width:1024px) 50vw, 25vw"
                className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] tracking-[0.18em] uppercase text-white/65">{cat.highlight}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">{cat.shortName}</h3>
                <p className="mt-3 text-sm text-white/70 line-clamp-2">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
