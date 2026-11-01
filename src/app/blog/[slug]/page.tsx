import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPost, type BlogBlock } from "@/data/blog";
import {
  JsonLd,
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: absoluteUrl(post.image),
    keywords: post.keywords,
    type: "article",
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-[1.05rem] leading-[1.75] text-ink/90">{block.text}</p>;
    case "h2":
      return (
        <h2 className="mt-12 scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-3 border-l-2 border-accent/40 pl-5">
          {block.items.map((item) => (
            <li key={item} className="text-[1.05rem] leading-relaxed text-ink/90">
              {item}
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="bg-bg-deep text-white">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold tracking-tight">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("-")} className="border-t border-line odd:bg-bg-muted even:bg-bg">
                  {row.map((cell, i) => (
                    <td key={`${cell}-${i}`} className="px-4 py-3 align-top text-ink/90">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cta":
      return (
        <aside className="border border-line bg-bg-muted/50 p-6 sm:p-8">
          <p className="text-[1.05rem] leading-relaxed text-ink/90">{block.text}</p>
          <Link
            href={block.href}
            className="mt-5 inline-flex bg-accent px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-deep"
          >
            {block.label}
          </Link>
        </aside>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const dateLabel = new Date(post.date).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.description,
            path: `/blog/${post.slug}`,
            image: post.image,
            date: post.date,
            keywords: post.keywords,
          }),
          faqJsonLd(post.faqs),
        ]}
      />

      <article>
        <header className="relative isolate overflow-hidden bg-bg-deep text-white">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/85 to-bg-deep/55" />
          </div>
          <div className="container-page relative py-20 lg:py-28">
            <p data-anim="fade" className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/55">
              <Link href="/blog" className="transition-colors hover:text-accent">
                Blog
              </Link>
              <span className="mx-2 text-white/30">/</span>
              Outdoor lighting
            </p>
            <h1
              data-anim="lines"
              className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-tight tracking-tight"
            >
              {post.title}
            </h1>
            <p data-anim="fade" className="mt-5 max-w-2xl text-white/70 leading-relaxed">
              {post.description}
            </p>
            <time
              data-anim="fade"
              dateTime={post.date}
              className="mt-6 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"
            >
              {dateLabel}
            </time>
          </div>
        </header>

        <div className="container-page section-pad">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="relative aspect-[16/9] overflow-hidden border border-line bg-bg-deep">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(max-width:768px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            {post.blocks.map((block, i) => (
              <Block key={`${block.type}-${i}`} block={block} />
            ))}

            <section className="mt-16 border-t border-line pt-12">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-8 space-y-6">
                {post.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-lg font-semibold text-ink">{faq.question}</h3>
                    <p className="mt-2 text-[1.05rem] leading-relaxed text-ink/85">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-8">
              <Link
                href="/categories/outdoor-light"
                className="inline-flex bg-accent px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-deep"
              >
                Shop outdoor lights
              </Link>
              <Link
                href="/blog"
                className="inline-flex border border-white/30 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-white hover:text-[#111]"
              >
                All articles
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
