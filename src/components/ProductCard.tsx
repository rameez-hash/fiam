import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-white border border-line">
          <Image
            src={product.image}
            alt={`${product.name} — ${product.series}`}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="product-card-img object-contain p-5"
          />
        </div>
        <div className="mt-3">
          <p className="text-xs text-ink-soft">{product.series}</p>
          <h3 className="mt-1 text-base font-semibold text-ink group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{product.tagline}</p>
        </div>
      </Link>
    </article>
  );
}
