import Image from "next/image";
import Link from "next/link";
import { productImage, specValue, type CatalogProduct } from "@/data/catalog";

export function ProductCard({
  product,
  label,
  index,
}: {
  product: CatalogProduct;
  label?: string;
  index?: number;
}) {
  const img = productImage(product);
  const watt = specValue(product, "Watt", "Power");
  const beam = specValue(product, "Beam");
  const meta = [watt, beam].filter(Boolean).join(" · ");

  return (
    <article className="product-card group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden border border-line/60 bg-white">
          {typeof index === "number" && (
            <span className="absolute left-3 top-3 z-[1] text-[11px] font-medium tabular-nums text-ink/35">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          {img && (
            <Image
              src={img}
              alt={`${product.code} ${product.seriesTitle}`.trim()}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              className="product-card-img product-shot object-contain p-1.5 sm:p-2"
            />
          )}
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
            aria-hidden
          />
        </div>
        <div className="mt-3.5">
          <p className="line-clamp-1 text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {label ?? product.seriesTitle}
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
            {product.code}
          </h3>
          {meta && <p className="mt-1 text-sm text-ink-soft">{meta}</p>}
        </div>
      </Link>
    </article>
  );
}
