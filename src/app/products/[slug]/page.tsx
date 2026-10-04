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
  specValue,
} from "@/data/catalog";
import { company } from "@/data/products";
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

function highlightRows(product: NonNullable<ReturnType<typeof getCatalogProduct>>) {
  const keys: [string, ...string[]][] = [
    ["Watt", "Power"],
    ["Lumen", "Luminous"],
    ["Beam"],
    ["Size", "Body Size"],
    ["Cutout", "Cut Out", "Cut"],
    ["IP"],
  ];
  return keys
    .map((labels) => {
      const value = specValue(product, ...labels);
      return value ? { label: labels[0], value } : null;
    })
    .filter((row): row is { label: string; value: string } => Boolean(row));
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
  const highlights = highlightRows(product);
  const gallery = product.images.length ? product.images : [productImage(product)].filter(Boolean);
  const sections = product.sections.filter((s) => s.text || s.images.length);
  const productName = product.specs.find((s) => s.label.toLowerCase() === "name")?.value;
  const installation = specValue(product, "Installation");

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

      <section className="border-b border-line bg-white">
        <div className="container-page py-8 lg:py-12">
          <nav
            className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-soft"
            aria-label="Breadcrumb"
          >
            <Link href="/products" className="transition-colors hover:text-ink">
              Products
            </Link>
            {trail.map((n) => (
              <span key={n.id} className="flex min-w-0 items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={`/categories/${n.slug}`} className="truncate transition-colors hover:text-ink">
                  {n.name}
                </Link>
              </span>
            ))}
            <span aria-hidden>/</span>
            <span className="font-medium text-ink">{product.code}</span>
          </nav>

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div>
              <ProductGallery images={gallery} alt={`${product.code} ${product.seriesTitle}`.trim()} />
            </div>

            <div className="flex min-w-0 flex-col lg:min-h-[min(100%,520px)]">
              {(product.seriesTitle || root?.name) && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {product.seriesTitle || root?.name}
                </p>
              )}

              <h1 data-anim="lines" className="mt-3 text-[2rem] font-semibold leading-[1.08] tracking-tight sm:text-[2.75rem]">
                {product.code}
              </h1>

              {(productName || installation) && (
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                  {[productName, installation].filter(Boolean).join(" · ")}
                </p>
              )}

              {highlights.length > 0 && (
                <dl className="mt-8 grid grid-cols-2 border-y border-line sm:grid-cols-3">
                  {highlights.map((row) => (
                    <div key={row.label} className="border-b border-line px-0 py-4 pr-4 sm:[&:nth-child(3n)]:pr-0">
                      <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-soft">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-base font-semibold tracking-tight text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex bg-accent px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-accent-deep"
                >
                  Request quote
                </Link>
                <Link
                  href="/corporate"
                  className="inline-flex border border-ink px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-white"
                >
                  Bulk order
                </Link>
                <a
                  href={`tel:${company.phoneTel}`}
                  className="inline-flex items-center px-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  {company.phone}
                </a>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-6 text-sm text-ink-soft lg:mt-10">
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-ink">
                  {company.email}
                </a>
                {family && (
                  <Link href={`/categories/${family.slug}`} className="link-underline text-ink">
                    More in {family.name}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {specs.length > 0 && (
        <section className="border-b border-line bg-bg">
          <div className="container-page py-14 lg:py-16">
            <div className="mb-8 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">Specifications</p>
              <h2 data-anim="lines" className="mt-2 text-3xl font-semibold tracking-tight">
                Technical data
              </h2>
            </div>

            <dl className="grid sm:grid-cols-2 sm:gap-x-10">
              {specs.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[minmax(7rem,0.85fr)_minmax(0,1.15fr)] gap-3 border-t border-line py-3.5 text-sm last:border-b sm:last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b"
                >
                  <dt className="text-ink-soft">{row.label}</dt>
                  <dd className="font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {sections.map((s) => (
        <section key={s.title} className="border-b border-line bg-white">
          <div className="container-page py-14">
            <h2 data-anim="lines" className="text-2xl font-semibold tracking-tight">
              {s.title}
            </h2>
            {s.text && (
              <p className="mt-4 max-w-3xl whitespace-pre-line leading-relaxed text-ink-soft">{s.text}</p>
            )}
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
                    className="h-auto w-full bg-bg-muted object-contain"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {siblings.length > 0 && family && (
        <section className="section-pad bg-white">
          <div className="container-page">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">Same family</p>
                <h2 data-anim="lines" className="mt-2 text-3xl font-semibold tracking-tight">
                  Other {family.name} models
                </h2>
              </div>
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
