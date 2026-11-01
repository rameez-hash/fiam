import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Lighting Blog | Outdoor LED Lights & Guides | FIAM Pakistan",
  description:
    "Read FIAM Pakistan lighting guides on outdoor LED lights, garden lighting, wall lights, floodlights and landscape fixtures for homes and buildings.",
  path: "/blog",
  keywords: [
    "Outdoor LED Lights in Pakistan",
    "Outdoor lighting Pakistan",
    "LED garden lights",
    "FIAM lighting blog",
  ],
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section className="bg-bg-deep text-white">
        <div className="container-page py-20 lg:py-24">
          <p data-anim="fade" className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/55">
            Blog
          </p>
          <h1
            data-anim="lines"
            className="mt-4 max-w-3xl font-display text-5xl font-semibold tracking-tight sm:text-6xl"
          >
            Lighting guides for Pakistan
          </h1>
          <p data-anim="fade" className="mt-5 max-w-2xl text-white/70 leading-relaxed">
            Practical articles on outdoor LED lights, landscape fixtures, and choosing the right FIAM
            products for homes and buildings.
          </p>
        </div>
      </section>

      <section className="container-page section-pad">
        <ul data-anim="stagger" className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-line bg-bg-muted transition-colors hover:border-accent"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-deep">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <time dateTime={post.date} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                    {new Date(post.date).toLocaleDateString("en-PK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink group-hover:text-accent sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
                  <span className="mt-6 inline-flex text-sm font-medium text-ink link-underline self-start">
                    Read article
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
