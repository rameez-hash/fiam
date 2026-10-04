import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import {
  catalogProducts,
  getAncestors,
  getCatalogProduct,
  getNodeById,
  getProductSiblings,
  getRootCategory,
  productImage,
} from "@/data/catalog";
import { JsonLd, breadcrumbJsonLd, buildMetadata, productJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return catalogProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getCatalogProduct(slug);
  if (!product) return {};
  const family = getNodeById(product.nodeId);
  const specText = product.specs
    .slice(0, 5)
    .map((s) => `${s.label} ${s.value}`)
    .join(", ");
  return buildMetadata({
    title: `${product.code} ${product.seriesTitle || family?.name || ""}`.trim(),
    description: `FIAM ${product.code}${product.seriesTitle ? ` — ${product.seriesTitle}` : ""}. ${specText}. Available in Pakistan from Fiam Pakistan.`.slice(0, 300),
    path: `/products/${product.slug}`,
    image: productImage(product) || undefined,
    keywords: [product.code, family?.name ?? "", product.seriesTitle].filter(Boolean),
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getCatalogProduct(slug);
  if (!product) notFound();

  const family = getNodeById(product.nodeId);
  const trail = family ? [...getAncestors(family), family] : [];
  const root = family ? getRootCategory(family) : undefined;
  const siblings = getProductSiblings(product).filter((p) => p.id !== product.id);
  const specs = product.specs.length ? product.specs : product.params;
  const sizeRows = product.specs.length ? product.params : [];
  const gallery = product.images.length ? product.images : [productImage(product)].filter(Boolean);
  const sections = product.sections.filter((s) => s.text || s.images.length);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            ...trail.map((n) => ({ name: n.name, path: `/categories/${n.slug}` })),
            { name: product.code, path: `/products/${product.slug}` },
          ]),
          productJsonLd(product, root?.name),
        ]}
      />

      <section className="container-page py-12 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft" aria-label="Breadcrumb">
          <Link href="/products" className="hover:text-ink">
            Products
          </Link>
          {trail.map((n) => (
            <span key={n.id} className="flex items-center gap-2">
              <span aria-hidden>/</span>
              <Link href={`/categories/${n.slug}`} className="hover:text-ink">
                {n.name}
              </Link>
            </span>
          ))}
          <span aria-hidden>/</span>
          <span className="text-ink">{product.code}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-anim="image">
            <ProductGallery images={gallery} alt={`${product.code} ${product.seriesTitle}`.trim()} />
          </div>

          <div>
            {product.seriesTitle && (
              <p data-anim="fade" className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">
                {product.seriesTitle}
              </p>
            )}
            <h1 data-anim="lines" data-delay="0.1" className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              {product.code}
            </h1>

            <div data-anim="fade" data-delay="0.2" className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex bg-accent px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-accent-deep"
              >
                Request quote
              </Link>
              <Link
                href="/corporate"
                className="inline-flex border border-ink px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-white"
              >
                Bulk / corporate order
              </Link>
            </div>

            {specs.length > 0 && (
              <div className="mt-12">
                <h2 data-anim="fade" className="text-2xl font-semibold">
                  Technical data
                </h2>
                <dl data-anim="stagger" className="mt-6 divide-y divide-line border-y border-line">
                  {specs.map((row) => (
                    <div key={row.label} className="grid grid-cols-[1fr_1.3fr] gap-4 py-3 text-sm">
                      <dt className="text-ink-soft">{row.label}</dt>
                      <dd className="font-medium text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {sizeRows.length > 0 && (
              <div className="mt-10">
                <h2 data-anim="fade" className="text-lg font-semibold">
                  At a glance
                </h2>
                <dl data-anim="stagger" className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {sizeRows.map((row) => (
                    <div key={row.label} className="border border-line bg-white px-4 py-3">
                      <dt className="text-xs text-ink-soft">{row.label}</dt>
                      <dd className="mt-1 text-sm font-semibold text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      {sections.map((s) => (
        <section key={s.title} className="border-t border-line bg-white">
          <div className="container-page py-14">
            <h2 data-anim="lines" className="text-2xl font-semibold tracking-tight">
              {s.title}
            </h2>
            {s.text && <p className="mt-4 max-w-3xl whitespace-pre-line leading-relaxed text-ink-soft">{s.text}</p>}
            {s.images.length > 0 && (
              <div className="mt-8 grid gap-4">
                {s.images.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${product.code} ${s.title}`}
                    width={1400}
                    height={900}
                    sizes="(max-width:1280px) 100vw, 1200px"
                    className="h-auto w-full border border-line bg-white object-contain"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {siblings.length > 0 && family && (
        <section className="section-pad border-t border-line bg-white">
          <div className="container-page">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 data-anim="lines" className="text-3xl font-semibold tracking-tight">
                Other {family.name} models
              </h2>
              <Link href={`/categories/${family.slug}`} className="text-sm font-medium link-underline">
                View all in {family.name}
              </Link>
            </div>
            <div data-anim="stagger" className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {siblings.slice(0, 8).map((item) => (
                <ProductCard key={item.id} product={item} label={family.name} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
