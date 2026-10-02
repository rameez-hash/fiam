"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, getPopularProducts } from "@/data/products";
import { Logo } from "./Logo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/stores", label: "Stores" },
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
      <div className="relative z-[60] border-b border-white/10 bg-bg-deep text-sm text-white/70">
        <div className="container-page flex items-center justify-between gap-4 py-2">
          <a href="mailto:info@fiam.com.pk" className="hover:text-white transition-colors">
            info@fiam.com.pk
          </a>
          <p className="hidden sm:block">Lighting supply for projects across Pakistan</p>
          <a href="tel:+8676086925523" className="hover:text-white transition-colors">
            +86-760-8692 5523
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-line bg-white ${scrolled ? "shadow-sm" : ""}`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Logo priority size="md" variant="dark" />

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-ink">
            {nav.map((item) =>
              item.label === "Shop" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <Link href={item.href} className="py-2 hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                  <div
                    className={`absolute left-1/2 top-full z-50 w-[min(880px,90vw)] -translate-x-1/2 pt-2 transition-all duration-200 ${
                      shopOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="grid grid-cols-[0.9fr_1.4fr] overflow-hidden border border-line bg-white shadow-lg">
                      <div className="border-r border-line bg-bg p-5">
                        <p className="text-xs font-medium text-ink-soft">Categories</p>
                        <div className="mt-3 space-y-0.5">
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/categories/${cat.slug}`}
                              className="block px-2 py-2 text-sm text-ink hover:bg-white hover:text-accent transition-colors"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                        <Link href="/products" className="mt-4 inline-flex text-sm font-medium text-accent">
                          All products →
                        </Link>
                      </div>

                      <div className="p-5">
                        <p className="text-xs font-medium text-ink-soft">Popular products</p>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          {popular.map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.slug}`}
                              className="group flex gap-3 p-1.5 hover:bg-bg transition-colors"
                            >
                              <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-bg">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="56px"
                                  className="object-contain p-1"
                                />
                              </div>
                              <div className="min-w-0 self-center">
                                <p className="truncate text-sm font-medium text-ink group-hover:text-accent">
                                  {product.name}
                                </p>
                                <p className="mt-0.5 line-clamp-1 text-xs text-ink-soft">{product.tagline}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="py-2 hover:text-accent transition-colors">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-deep transition-colors"
            >
              Contact
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden flex h-10 w-10 items-center justify-center border border-line"
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
        className={`fixed inset-0 z-[70] bg-bg-deep text-white transition-transform duration-400 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container-page flex h-full flex-col overflow-y-auto py-8">
          <div className="mb-10 flex items-center justify-between">
            <Link href="/" onClick={() => setOpen(false)} aria-label="Fiam Pakistan home">
              <Image
                src="/fiam-logo-light.png"
                alt="FIAM"
                width={148}
                height={45}
                unoptimized
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button type="button" onClick={() => setOpen(false)} className="text-sm">
              Close
            </button>
          </div>
          <div className="flex flex-col gap-5 text-2xl font-medium">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-10 border-t border-white/15 pt-8">
            <p className="text-sm text-white/50">Shop by category</p>
            <div className="mt-4 grid gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/75"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
