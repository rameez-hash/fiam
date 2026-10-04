import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/stores", label: "Stores" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[72vh] flex-col justify-center overflow-hidden bg-bg-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(232,93,4,0.22),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(255,255,255,0.06),transparent_45%)]"
      />
      <div className="container-page relative py-24 sm:py-28">
        <div className="flex items-center gap-3">
          <span className="inline-block size-3 rounded-full bg-accent" aria-hidden />
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-white/55">
            Page not found
          </p>
        </div>

        <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
          This light went out
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
          The page you opened is missing or has moved. Browse products, find a store,
          or head home to keep exploring Fiam Lighting Pakistan.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
          >
            Back to home
          </Link>
          <Link
            href="/products"
            className="inline-flex border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
          >
            View products
          </Link>
        </div>

        <nav
          aria-label="Helpful links"
          className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/55"
        >
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
