import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NodeCard } from "@/components/NodeCard";
import { ProductCard } from "@/components/ProductCard";
import {
  catalogNodes,
  countProducts,
  getAncestors,
  getChildren,
  getNode,
  getNodeById,
  getNodeProducts,
  getRootCategory,
  nodeImage,
  topCategories,
} from "@/data/catalog";
import {
  commercialPageKeywords,
  decorativePageKeywords,
  modulesPageKeywords,
  outdoorPageKeywords,
} from "@/data/seo-keywords";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

function keywordsForRoot(rootId?: string): string[] {
  switch (rootId) {
    case "7":
      return commercialPageKeywords();
    case "8":
      return modulesPageKeywords();
    case "10":
      return outdoorPageKeywords();
    case "1198":
      return decorativePageKeywords();
    default:
      return ["LED lights Pakistan", "lighting fixtures Pakistan", "Fiam Pakistan"];
  }
}

export function generateStaticParams() {
  return catalogNodes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const node = getNode(slug);
  if (!node) return {};
  const root = getRootCategory(node);
  const top = node.depth === 0 ? root : undefined;
  const trail = getAncestors(node).map((n) => n.name);
  const rootKeywords = keywordsForRoot(root?.id);
  return buildMetadata({
    title: top?.seoTitle ?? `${node.name} Pakistan | ${root?.name ?? "FIAM"} Lighting`,
    description:
      top?.seoDescription ??
      `Shop ${node.name} in Pakistan from Fiam: ${countProducts(node)} models with specs and images. Part of ${[...trail].reverse().join(" / ") || root?.name || "FIAM"} lighting nationwide.`,
    path: `/categories/${node.slug}`,
    image: nodeImage(node) || undefined,
    keywords: [node.name, ...trail, ...rootKeywords],
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const node = getNode(slug);
  if (!node) notFound();

  const ancestors = getAncestors(node);
  const root = getRootCategory(node);
  const children = getChildren(node);
  const items = getNodeProducts(node);
  const parent = node.parentId ? getNodeById(node.parentId) : undefined;
  const siblings = parent ? getChildren(parent) : [];
  const isTop = node.depth === 0;
  const total = countProducts(node);
  const chips = isTop
    ? topCategories.map((c) => ({ id: c.id, slug: c.slug, label: c.shortName }))
    : siblings.map((s) => ({ id: s.id, slug: s.slug, label: s.name }));

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    ...ancestors.map((a) => ({ name: a.name, path: `/categories/${a.slug}` })),
    { name: node.name, path: `/categories/${node.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      {isTop && root ? (
        <section className="relative isolate min-h-[52vh] overflow-hidden bg-bg-deep text-white sm:min-h-[58vh]">
          {node.image ? (
            <div data-parallax="12" className="absolute inset-x-0 -inset-y-[8%]">
              <Image
                src={node.image}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
          <div className="container-page relative flex min-h-[52vh] flex-col justify-end pb-14 pt-28 sm:min-h-[58vh] sm:pb-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/70">
              {root.highlight}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {node.name}
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-base">
              {root.description}
            </p>
          </div>
        </section>
      ) : (
        <section className="border-b border-line bg-white">
          <div className="container-page py-12 lg:py-16">
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft" aria-label="Breadcrumb">
              <Link href="/products" className="hover:text-ink">
                Products
              </Link>
              {ancestors.map((a) => (
                <span key={a.id} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  <Link href={`/categories/${a.slug}`} className="hover:text-ink">
                    {a.name}
                  </Link>
                </span>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h1 data-anim="lines" className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                {node.name}
              </h1>
              <p data-anim="fade" className="text-sm text-ink-soft">
                {total} {total === 1 ? "model" : "models"}
              </p>
            </div>
          </div>
        </section>
      )}

      <nav className="container-page flex flex-wrap gap-2 py-8" aria-label={isTop ? "Categories" : "Related series"}>
        {chips.map((n) => (
          <Link
            key={n.id}
            href={`/categories/${n.slug}`}
            className={`border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors ${
              n.id === node.id
                ? "border-accent bg-accent text-white"
                : "border-line bg-white hover:border-accent hover:text-accent"
            }`}
          >
            {n.label}
          </Link>
        ))}
      </nav>

      {children.length > 0 && (
        <section className="container-page pb-16">
          <p className="mb-6 text-sm text-ink-soft">
            {children.length} {isTop ? "series" : "product families"}
          </p>
          <div data-anim="stagger" className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {children.map((child) => (
              <NodeCard key={child.id} node={child} />
            ))}
          </div>
        </section>
      )}

      {items.length > 0 && (
        <section className="container-page pb-20">
          <p className="mb-6 text-sm text-ink-soft">
            {items.length} {items.length === 1 ? "model" : "models"}
          </p>
          <div data-anim="stagger" className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} label={node.name} />
            ))}
          </div>
        </section>
      )}

      {children.length === 0 && items.length === 0 && (
        <section className="container-page pb-20">
          <p className="text-ink-soft">
            Models for this series are available on request.{" "}
            <Link href="/contact" className="text-ink link-underline">
              Contact us
            </Link>
          </p>
        </section>
      )}
    </>
  );
}
