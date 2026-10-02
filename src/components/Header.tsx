"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, getPopularProducts } from "@/data/products";
import { Logo } from "./Logo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/corporate", label: "Corporate" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const popular = getPopularProducts().slice(0, 4);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="relative z-[60] bg-bg-deep text-[11px] tracking-[0.16em] text-white/70 uppercase">
        <div className="container-page flex items-center justify-between gap-4 py-2.5">
          <a href="mailto:info@fiam.com.pk" className="hover:text-white transition-colors">
            info@fiam.com.pk
          </a>
          <p className="hidden sm:block">Project lighting support worldwide</p>
          <a href="tel:+8676086925523" className="hover:text-white transition-colors">
            +86-760-8692 5523
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-line/60 bg-white/95 backdrop-blur-md transition-shadow duration-500 ${
          scrolled ? "shadow-[0_10px_40px_rgba(16,18,24,0.06)]" : ""
        }`}
      >
        <div className="container-page flex h-[76px] items-center justify-between gap-6">
          <Logo priority size="md" variant="dark" />

          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold tracking-[0.14em] uppercase text-ink">
            {nav.map((item) =>
              item.label === "Shop" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <Link href={item.href} className="link-underline py-2">
                    {item.label}
                  </Link>
                  <div
                    className={`absolute left-1/2 top-full z-50 w-[min(920px,90vw)] -translate-x-1/2 pt-3 transition-all duration-300 ${
                      shopOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="grid grid-cols-[0.9fr_1.4fr] overflow-hidden border border-line bg-white shadow-[0_24px_80px_rgba(16,18,24,0.14)]">
                      <div className="border-r border-line bg-bg p-6">
                        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-soft">
                          Categories
                        </p>
                        <div className="mt-4 space-y-1">
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/categories/${cat.slug}`}
                              className="block px-3 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-white hover:text-accent"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/products"
                          className="mt-6 inline-flex text-[11px] font-semibold tracking-[0.16em] uppercase text-accent link-underline"
                        >
                          View all products
                        </Link>
                      </div>

                      <div className="p-6">
                        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-soft">
                          Popular products
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          {popular.map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.slug}`}
                              className="group flex gap-3 rounded-sm border border-transparent p-2 transition-colors hover:border-line hover:bg-bg"
                            >
                              <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-bg">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="64px"
                                  className="object-contain p-1"
                                />
                              </div>
                              <div className="min-w-0 self-center">
                                <p className="truncate text-sm font-semibold text-ink group-hover:text-accent">
                                  {product.name}
                                </p>
                                <p className="mt-0.5 line-clamp-2 text-[11px] text-ink-soft">
                                  {product.tagline}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="link-underline py-2">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center bg-accent px-5 py-2.5 text-[12px] font-semibold tracking-[0.14em] uppercase text-white transition-colors hover:bg-accent-deep"
            >
              Get in touch
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden flex h-11 w-11 items-center justify-center border border-line"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full bg-ink transition-transform ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-[2px] w-full bg-ink transition-opacity ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-[2px] w-full bg-ink transition-transform ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[70] bg-bg-deep text-white transition-transform duration-500 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container-page flex h-full flex-col overflow-y-auto py-8">
          <div className="mb-10 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-label="Fiam Pakistan home"
              className="inline-flex bg-transparent"
            >
              <Image
                src="/fiam-logo-light.png"
                alt="FIAM"
                width={148}
                height={45}
                unoptimized
                className="h-10 w-auto object-contain bg-transparent"
              />
            </Link>
            <button type="button" onClick={() => setOpen(false)} className="text-sm tracking-widest uppercase">
              Close
            </button>
          </div>
          <div className="flex flex-col gap-6 text-3xl font-display">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-10 border-t border-white/15 pt-8">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/45">Shop products</p>
            <div className="mt-4 grid gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-[0.08em] uppercase text-white/70"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="mt-2 text-sm font-semibold tracking-[0.12em] uppercase text-accent"
              >
                View all products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
