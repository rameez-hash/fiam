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
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%231a1a1a' stroke-width='0.6'%3E%3Cpath d='M10 40h140M10 80h140M10 120h140M40 10v140M80 10v140M120 10v140'/%3E%3Cpath d='M10 40l30-30M130 10l20 20M10 120l40 40M110 150l40-40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      <div className="relative container-page section-pad">
        {/* Mobile / tablet: copy first, then collage */}
        <div className="lg:hidden">
          <p data-anim="fade" className="flex items-center gap-2 text-sm font-medium text-accent">
            <span aria-hidden>✱</span>
            Our Benefits
          </p>
          <h2
            data-anim="lines"
            className="mt-4 text-[clamp(1.7rem,6vw,2.4rem)] font-semibold uppercase leading-[1.12] tracking-tight text-ink"
          >
            Lighting spaces designed with you in mind
          </h2>
          <p data-anim="fade" className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Beyond fixtures — Fiam Pakistan helps architects, contractors, and homeowners specify
            lighting that supports comfort, clarity, and daily use.
          </p>
          <ul data-anim="stagger" className="mt-7 space-y-3.5">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-ink">
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

          <div className="mt-10 grid grid-cols-2 gap-3">
            <div data-anim="image" className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="/benefits/living.jpg"
                alt="Modern living space with pendant lighting"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            <div data-anim="image" className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/benefits/bedroom.jpg"
                alt="Bedroom with decorative chandelier lighting"
                fill
                sizes="50vw"
                className="object-cover object-center"
              />
            </div>
            <div data-anim="image" className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/benefits/kitchen.jpg"
                alt="Kitchen island with pendant lights"
                fill
                sizes="50vw"
                className="object-cover object-[center_40%]"
              />
            </div>
          </div>
        </div>

        {/* Desktop: 3-column collage matching the reference */}
        <div className="hidden lg:grid lg:grid-cols-[0.95fr_0.82fr_1.15fr] lg:items-stretch lg:gap-7 xl:gap-9">
          <div data-anim="image" className="relative min-h-[560px] overflow-hidden rounded-[1.25rem]">
            <Image
              src="/benefits/living.jpg"
              alt="Modern living space with pendant lighting"
              fill
              sizes="30vw"
              className="object-cover object-[center_35%]"
            />
          </div>

          <div className="flex min-h-[560px] flex-col">
            <div data-anim="fade" className="flex flex-1 items-center justify-center pb-6">
              <Image
                src="/fiam-logo.png"
                alt="FIAM"
                width={140}
                height={43}
                unoptimized
                className="h-10 w-auto object-contain xl:h-11"
              />
            </div>
            <div data-anim="image" className="relative h-[380px] overflow-hidden rounded-[1.25rem] xl:h-[420px]">
              <Image
                src="/benefits/bedroom.jpg"
                alt="Bedroom with decorative chandelier lighting"
                fill
                sizes="26vw"
                className="object-cover object-[center_25%]"
              />
            </div>
          </div>

          <div className="flex min-h-[560px] flex-col">
            <p data-anim="fade" className="flex items-center gap-2 text-sm font-medium text-accent">
              <span aria-hidden>✱</span>
              Our Benefits
            </p>

            <h2
              data-anim="lines"
              className="mt-4 max-w-md text-[clamp(1.85rem,2.6vw,2.55rem)] font-semibold uppercase leading-[1.12] tracking-tight text-ink"
            >
              Lighting spaces designed with you in mind
            </h2>

            <p data-anim="fade" className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Beyond fixtures — Fiam Pakistan helps architects, contractors, and homeowners specify
              lighting that supports comfort, clarity, and daily use.
            </p>

            <ul data-anim="stagger" className="mt-7 space-y-3.5">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-ink">
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
              className="relative mt-auto pt-8"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/benefits/kitchen.jpg"
                  alt="Kitchen island with pendant lights"
                  fill
                  sizes="34vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
