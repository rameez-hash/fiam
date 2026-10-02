import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={`${product.name} — ${product.series}`}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="product-card-img object-contain p-6"
          />
          <span className="absolute left-4 top-4 bg-bg-deep/90 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-white opacity-0 transition-opacity group-hover:opacity-100">
            View
          </span>
        </div>
        <div className="mt-4">
          <p className="text-[11px] tracking-[0.14em] uppercase text-ink-soft">{product.series}</p>
          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{product.tagline}</p>
        </div>
      </Link>
    </article>
  );
}
