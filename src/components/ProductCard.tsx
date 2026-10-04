import Image from "next/image";
import Link from "next/link";
import { productImage, specValue, type CatalogProduct } from "@/data/catalog";

export function ProductCard({ product, label }: { product: CatalogProduct; label?: string }) {
  const img = productImage(product);
  const watt = specValue(product, "Watt", "Power");
  const beam = specValue(product, "Beam");
  const meta = [watt, beam].filter(Boolean).join(" · ");

  return (
    <article className="product-card group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden border border-line bg-white">
          {img && (
            <Image
              src={img}
              alt={`${product.code} ${product.seriesTitle}`.trim()}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              className="product-card-img object-contain p-5"
            />
          )}
        </div>
        <div className="mt-3">
          <p className="line-clamp-1 text-xs text-ink-soft">{label ?? product.seriesTitle}</p>
          <h3 className="mt-1 text-base font-semibold text-ink transition-colors group-hover:text-accent">
            {product.code}
          </h3>
          {meta && <p className="mt-1 text-sm text-ink-soft">{meta}</p>}
        </div>
      </Link>
    </article>
  );
}
