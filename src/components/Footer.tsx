import Image from "next/image";
import Link from "next/link";
import { categories, company } from "@/data/products";

const usefulLinks = [
  { href: "/about", label: "About" },
  { href: "/stores", label: "Store locations" },
  { href: "/projects", label: "Projects" },
  { href: "/corporate", label: "Corporate orders" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-bg-deep text-white">
      <div className="container-page pt-14 pb-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              LED fixtures for commercial, outdoor, and decorative projects across Pakistan.
            </p>
            <a href={`mailto:${company.email}`} className="mt-4 inline-block text-sm text-white hover:text-accent">
              {company.email}
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Collections</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-white">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="hover:text-white">
                  All products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li>
                <Link
                  href="/corporate"
                  className="mt-3 inline-flex border border-white/25 px-4 py-2 text-sm text-white hover:border-accent hover:bg-accent transition-colors"
                >
                  Bulk / corporate order
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <a href="https://fiam.com.pk/" className="hover:text-white">
            fiam.com.pk
          </a>
        </div>
      </div>
    </footer>
  );
}
