import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@/data/products";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/categories/${category.slug}`,
    image: category.image,
    keywords: [category.name, category.shortName, "FIAM category"],
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(category.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: category.name, path: `/categories/${category.slug}` },
        ])}
      />

      <section className="relative isolate min-h-[48vh] overflow-hidden bg-bg-deep text-white">
        <Image
          src={category.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="relative container-page flex min-h-[48vh] flex-col justify-end pb-16 pt-28">
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-white/60">
            {category.highlight}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            {category.name}
          </h1>
          <p className="mt-5 max-w-2xl text-white/75 leading-relaxed">{category.description}</p>
        </div>
      </section>

      <section className="container-page py-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className={`border px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors ${
              cat.slug === category.slug
                ? "border-accent bg-accent text-white"
                : "border-line bg-white hover:border-accent hover:text-accent"
            }`}
          >
            {cat.shortName}
          </Link>
        ))}
      </section>

      <section className="container-page pb-20">
        <p className="mb-8 text-sm text-ink-soft">{items.length} products</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
