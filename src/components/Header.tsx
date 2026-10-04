"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/products";
import { Logo } from "./Logo";

export type MenuCategory = {
  slug: string;
  name: string;
  image: string;
  count: number;
  series: { slug: string; name: string }[];
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/stores", label: "Stores" },
  { href: "/corporate", label: "Corporate" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header({ menu }: { menu: MenuCategory[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [mobileCat, setMobileCat] = useState<number | null>(null);
  const current = menu[activeCat] ?? menu[0];
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const shopOpenRef = useRef(false);

  useEffect(() => {
    shopOpenRef.current = shopOpen;
  }, [shopOpen]);

  useEffect(() => {
    const header = headerRef.current;
    let lastY = window.scrollY;
    let hidden = false;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (header && goingDown && y > 320 && !hidden && !shopOpenRef.current) {
        hidden = true;
        gsap.to(header, { yPercent: -100, duration: 0.45, ease: "power3.out" });
      } else if (header && (goingUp || y < 120) && hidden) {
        hidden = false;
        gsap.to(header, { yPercent: 0, duration: 0.45, ease: "power3.out" });
      }
      if (goingDown || goingUp) lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const menu = menuRef.current;
    if (open && menu && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        menu.querySelectorAll("[data-menu-item]"),
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.05, delay: 0.15 }
      );
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="relative z-[60] border-b border-white/10 bg-bg-deep text-sm text-white/70">
        <div className="container-page flex items-center justify-between gap-4 py-2">
          <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
            {company.email}
          </a>
          <p className="hidden sm:block">{company.hours}</p>
          <a href={`tel:${company.phoneTel}`} className="hover:text-white transition-colors">
            {company.phone}
          </a>
        </div>
      </div>

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b border-line bg-white transition-shadow ${scrolled ? "shadow-sm" : ""}`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Logo priority size="md" variant="dark" />

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-ink">
            {nav.map((item) =>
              item.label === "Products" ? (
                <div
                  key={item.href}
                  className="flex h-16 items-center"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <Link
                    href={item.href}
                    aria-expanded={shopOpen}
                    onFocus={() => setShopOpen(true)}
                    className="flex items-center gap-1.5 py-2 transition-colors hover:text-accent"
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 10 6"
                      className={`h-1.5 w-2.5 transition-transform ${shopOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    >
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </Link>
                  <div
                    className={`absolute inset-x-0 top-full z-50 transition-all duration-200 ${
                      shopOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="border-b border-line bg-white shadow-lg">
                      <div className="container-page grid grid-cols-[240px_1fr_260px] gap-8 py-7">
                        <div className="border-r border-line pr-6">
                          <p className="text-xs font-medium text-ink-soft">Categories</p>
                          <div className="mt-3 space-y-0.5">
                            {menu.map((cat, i) => (
                              <Link
                                key={cat.slug}
                                href={`/categories/${cat.slug}`}
                                onMouseEnter={() => setActiveCat(i)}
                                onFocus={() => setActiveCat(i)}
                                onClick={() => setShopOpen(false)}
                                className={`flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                                  i === activeCat ? "bg-bg text-accent" : "text-ink hover:bg-bg"
                                }`}
                              >
                                <span>{cat.name}</span>
                                <span className="text-xs tabular-nums text-ink-soft">{cat.count}</span>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/products"
                            onClick={() => setShopOpen(false)}
                            className="mt-5 inline-flex px-3 text-sm font-medium text-accent"
                          >
                            All products →
                          </Link>
                        </div>

                        {current && (
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-ink-soft">{current.name} series</p>
                            <div className="mt-3 grid max-h-[52vh] grid-cols-2 gap-x-6 overflow-y-auto xl:grid-cols-3">
                              {current.series.map((s) => (
                                <Link
                                  key={s.slug}
                                  href={`/categories/${s.slug}`}
                                  onClick={() => setShopOpen(false)}
                                  className="block border-b border-line/60 py-2 text-sm leading-snug text-ink transition-colors hover:text-accent"
                                >
                                  {s.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {current?.image && (
                          <Link
                            href={`/categories/${current.slug}`}
                            onClick={() => setShopOpen(false)}
                            className="group relative block min-h-[240px] overflow-hidden bg-bg"
                          >
                            <Image
                              src={current.image}
                              alt={current.name}
                              fill
                              sizes="260px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-white">
                              Explore {current.name}
                            </span>
                          </Link>
                        )}
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
        ref={menuRef}
        className={`fixed inset-0 z-[70] bg-bg-deep text-white transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] lg:hidden ${
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
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} data-menu-item>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-10 border-t border-white/15 pt-8" data-menu-item>
            <p className="text-sm text-white/50">Product categories</p>
            <div className="mt-3 divide-y divide-white/10">
              {menu.map((cat, i) => (
                <div key={cat.slug}>
                  <button
                    type="button"
                    aria-expanded={mobileCat === i}
                    onClick={() => setMobileCat(mobileCat === i ? null : i)}
                    className="flex w-full items-center justify-between py-3 text-left text-base text-white/85"
                  >
                    {cat.name}
                    <span className="text-lg leading-none text-white/50">{mobileCat === i ? "−" : "+"}</span>
                  </button>
                  {mobileCat === i && (
                    <div className="grid gap-2.5 pb-4 pl-3">
                      <Link
                        href={`/categories/${cat.slug}`}
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium text-white"
                      >
                        View all {cat.name}
                      </Link>
                      {cat.series.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/categories/${s.slug}`}
                          onClick={() => setOpen(false)}
                          className="text-sm text-white/65"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
