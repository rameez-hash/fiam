import Image from "next/image";
import Link from "next/link";
import { categories, company } from "@/data/products";

const usefulLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/corporate", label: "Corporate orders" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bg-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,106,0,0.12),transparent_42%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />

      <div className="relative container-page pt-16 pb-10 lg:pt-20">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-accent">
              Stay in the light
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Specs, launches &amp; project support
            </h2>
            <p className="mt-3 text-sm text-white/55 leading-relaxed">
              Join the Fiam Pakistan list for new fixtures and corporate lighting updates.
            </p>
          </div>
          <form className="flex w-full max-w-md overflow-hidden rounded-sm border border-white/15 bg-white/[0.03] backdrop-blur-sm">
            <label className="sr-only" htmlFor="newsletter">
              Email for newsletter
            </label>
            <input
              id="newsletter"
              type="email"
              placeholder="Your email address"
              className="w-full bg-transparent px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button
              type="button"
              className="shrink-0 bg-accent px-6 text-[11px] font-semibold tracking-[0.14em] uppercase text-white hover:bg-accent-deep transition-colors"
            >
              Join
            </button>
          </form>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="Fiam Pakistan home"
              className="inline-flex bg-transparent"
            >
              <Image
                src="/fiam-logo-light.png"
                alt="FIAM"
                width={148}
                height={45}
                unoptimized
                className="h-11 w-auto object-contain bg-transparent"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
              Architectural LED for commercial, outdoor, and decorative projects — supplied across
              Pakistan for professionals who specify with confidence.
            </p>
            <a
              href={`mailto:${company.email}`}
              className="mt-6 inline-flex text-sm font-medium text-white link-underline"
            >
              {company.email}
            </a>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">
              Collections
            </h3>
            <div className="mt-3 mb-5 h-px w-8 bg-accent" />
            <ul className="space-y-3 text-[15px] text-white/70">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="transition-colors hover:text-accent">
                  All products
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">
              Useful links
            </h3>
            <div className="mt-3 mb-5 h-px w-8 bg-accent" />
            <ul className="space-y-3 text-[15px] text-white/70">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">
              Contact
            </h3>
            <div className="mt-3 mb-5 h-px w-8 bg-accent" />
            <ul className="space-y-4 text-[15px] text-white/70">
              <li>
                <p className="text-[11px] tracking-[0.14em] uppercase text-white/35">Email</p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1 block transition-colors hover:text-accent"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <p className="text-[11px] tracking-[0.14em] uppercase text-white/35">Phone</p>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="mt-1 block transition-colors hover:text-accent"
                >
                  {company.phone}
                </a>
                <a
                  href={`tel:${company.mobile.replace(/\s/g, "")}`}
                  className="mt-1 block transition-colors hover:text-accent"
                >
                  {company.mobile}
                </a>
              </li>
              <li>
                <Link
                  href="/corporate"
                  className="inline-flex border border-white/20 px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white transition-colors hover:border-accent hover:bg-accent"
                >
                  Bulk / corporate order
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/25">
        <div className="container-page flex flex-col gap-4 py-5 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <a href="https://fiam.com.pk/" className="hover:text-white transition-colors">
              fiam.com.pk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
