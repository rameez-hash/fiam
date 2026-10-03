import Image from "next/image";
import Link from "next/link";

const benefits = [
  "Clear product specs for project teams",
  "Nationwide dealer network in Pakistan",
  "Commercial, outdoor & decorative ranges",
  "Corporate & bulk order support",
];

export function BenefitsSection() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-muted">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%231a1a1a' stroke-width='0.6'%3E%3Cpath d='M10 40h140M10 80h140M10 120h140M40 10v140M80 10v140M120 10v140'/%3E%3Cpath d='M10 40l30-30M130 10l20 20M10 120l40 40M110 150l40-40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      <div className="relative container-page section-pad">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.85fr_1.15fr] lg:gap-8">
          <div data-anim="image" className="relative hidden min-h-[520px] overflow-hidden rounded-2xl bg-white lg:block">
            <Image
              src="/benefits/living.jpg"
              alt="Modern living space with pendant lighting"
              fill
              sizes="(max-width:1024px) 0vw, 30vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div data-anim="fade" className="flex justify-center lg:justify-start">
              <Image
                src="/fiam-logo.png"
                alt="FIAM"
                width={120}
                height={37}
                unoptimized
                className="h-9 w-auto object-contain"
              />
            </div>
            <div data-anim="image" className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white sm:aspect-[4/5] lg:min-h-[380px] lg:aspect-auto">
              <Image
                src="/benefits/bedroom.jpg"
                alt="Bedroom with decorative chandelier lighting"
                fill
                sizes="(max-width:1024px) 100vw, 28vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col pb-1 pt-2 lg:pt-0">
            <p data-anim="fade" className="flex items-center gap-2 text-sm font-medium text-accent">
              <span aria-hidden>✱</span>
              Our Benefits
            </p>

            <h2
              data-anim="lines"
              className="mt-4 text-[clamp(1.7rem,3.4vw,2.65rem)] font-semibold uppercase leading-[1.12] tracking-tight text-ink"
            >
              Lighting spaces designed with you in mind
            </h2>

            <p data-anim="fade" className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-[15px]">
              Beyond fixtures — Fiam Pakistan helps architects, contractors, and homeowners specify
              lighting that supports comfort, clarity, and daily use.
            </p>

            <ul data-anim="stagger" className="mt-7 space-y-3.5">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink sm:text-[15px]">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div data-anim="fade" className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
              >
                Contact Us
                <span aria-hidden>↗</span>
              </Link>
            </div>

            <div
              data-anim="image"
              className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl bg-white lg:mt-10"
            >
              <Image
                src="/benefits/kitchen.jpg"
                alt="Kitchen island with pendant lights"
                fill
                sizes="(max-width:1024px) 100vw, 35vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div data-anim="image" className="relative mt-6 aspect-[16/11] overflow-hidden rounded-2xl bg-white lg:hidden">
          <Image
            src="/benefits/living.jpg"
            alt="Modern living space with pendant lighting"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
