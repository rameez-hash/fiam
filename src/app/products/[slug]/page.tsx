import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import {
  getCategory,
  getProduct,
  getRelatedProducts,
  products,
} from "@/data/products";
import {
  JsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  productJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: `/products/${product.slug}`,
    image: product.image,
    keywords: [product.name, product.series, product.specs.code],
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getRelatedProducts(product);
  const specEntries = Object.entries(product.specs).filter(([, v]) => v);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            ...(category
              ? [{ name: category.name, path: `/categories/${category.slug}` }]
              : []),
            { name: product.name, path: `/products/${product.slug}` },
          ]),
          productJsonLd(product, category),
        ]}
      />

      <section className="container-page py-12 lg:py-20">
        <nav className="mb-8 text-sm text-ink-soft">
          <Link href="/products" className="hover:text-ink">
            Products
          </Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/categories/${category.slug}`} className="hover:text-ink">
                {category.shortName}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square bg-white">
            <Image
              src={product.image}
              alt={`${product.name} ${product.series} product photo`}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-contain p-10"
            />
          </div>

          <div>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent">
              {product.series}
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">{product.name}</h1>
            <p className="mt-4 text-lg text-ink-soft">{product.tagline}</p>
            <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex bg-accent px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white hover:bg-accent-deep"
              >
                Request quote
              </Link>
              <Link
                href="/corporate"
                className="inline-flex border border-ink px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase hover:bg-ink hover:text-white transition-colors"
              >
                Bulk / corporate order
              </Link>
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-flex text-[12px] font-semibold tracking-[0.16em] uppercase link-underline self-center"
                >
                  More in {category.shortName}
                </Link>
              )}
            </div>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-semibold">Technical data</h2>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {specEntries.map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[1fr_1.2fr] gap-4 py-3 text-sm">
                    <dt className="capitalize text-ink-soft">
                      {key.replace(/([A-Z])/g, " $1")}
                    </dt>
                    <dd className="font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad bg-white border-t border-line">
          <div className="container-page">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Related products</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
