import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Product ranges</h2>
            <p className="mt-2 text-ink-soft">Four main lines for commercial and outdoor work.</p>
          </div>
          <Link href="/products" className="text-sm font-medium text-ink link-underline self-start md:self-auto">
            See all products
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative min-h-[300px] overflow-hidden bg-bg-deep text-white"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width:1024px) 50vw, 25vw"
                className="object-cover opacity-50 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl font-semibold leading-snug">{cat.name}</h3>
                <p className="mt-2 text-sm text-white/70 line-clamp-2">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
