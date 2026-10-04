import Image from "next/image";
import Link from "next/link";
import { countProducts, nodeImage, type CatalogNode } from "@/data/catalog";

export function NodeCard({ node }: { node: CatalogNode }) {
  const img = nodeImage(node);
  const count = countProducts(node);

  return (
    <article className="product-card group">
      <Link href={`/categories/${node.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden border border-line bg-bg-deep">
          {img && (
            <Image
              src={img}
              alt={node.name}
              fill
              quality={90}
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              className="product-card-img object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
            {node.name}
          </h3>
          <span className="shrink-0 pt-0.5 text-xs tabular-nums text-ink-soft">
            {count} {count === 1 ? "model" : "models"}
          </span>
        </div>
      </Link>
    </article>
  );
}
