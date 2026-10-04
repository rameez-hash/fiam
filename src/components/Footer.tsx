import Image from "next/image";
import Link from "next/link";
import { topCategories } from "@/data/catalog";
import { company } from "@/data/products";

const informationLinks = [
  { href: "/about", label: "About our company" },
  { href: "/products", label: "View our products" },
  { href: "/corporate", label: "Corporate orders" },
  { href: "/projects", label: "Our latest projects" },
  { href: "/stores", label: "Store locations" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8c0-.6.4-1 1-1Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Website",
    href: "https://fiam.com.pk/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[#1a1c1e] text-white">
      <div className="container-page">
        {/* Top: logo + socials */}
        <div className="flex flex-col gap-6 border-b border-white/15 py-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label="Fiam Pakistan home" className="inline-flex">
            <Image
              src="/fiam-logo-light.png"
              alt="FIAM"
              width={140}
              height={42}
              unoptimized
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm font-medium text-white/80">Follow our socials</p>
            <div className="flex items-center gap-2.5">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1a1c1e] transition-opacity hover:opacity-85"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: 4 columns */}
        <div data-anim="stagger" className="grid gap-10 border-b border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <h3 className="text-base font-semibold">Information</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {informationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">Collections</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {topCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="transition-colors hover:text-white">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="transition-colors hover:text-white">
                  All products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">Contact us</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3A2 2 0 0 1 18 20 14 14 0 0 1 4 6a2 2 0 0 1 2.5-1.5Z" />
                  </svg>
                </span>
                <a href={`tel:${company.phoneTel}`} className="pt-1.5 hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
                    <path d="m4.5 7 7.5 6 7.5-6" />
                  </svg>
                </span>
                <a href={`mailto:${company.email}`} className="pt-1.5 hover:text-white">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <Link href="/stores" className="pt-1.5 hover:text-white">
                  Stores across Pakistan — view locator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">Get the latest updates</h3>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              Product launches and project lighting tips — straight to your inbox.
            </p>
            <form className="mt-5 flex overflow-hidden rounded-sm bg-white">
              <label className="sr-only" htmlFor="footer-newsletter">
                Email address
              </label>
              <input
                id="footer-newsletter"
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 py-3 text-sm text-[#1a1c1e] outline-none placeholder:text-black/40"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="px-4 text-[#1a1c1e] transition-colors hover:text-accent"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="py-6 text-center text-sm text-white/55">
          <p>
            Copyright © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
