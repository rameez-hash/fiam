import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Up & down beams",
    text: "Warm dual-direction glow for fences, walls, and garden paths.",
  },
  {
    title: "Solar powered",
    text: "Charges by day, lights automatically from dusk to dawn.",
  },
  {
    title: "Weather ready",
    text: "Outdoor-tough housing built for year-round Pakistani climates.",
  },
  {
    title: "Easy install",
    text: "Wireless mount — no wiring, no electrician required.",
  },
];

export function SolarLights() {
  return (
    <section className="relative overflow-hidden bg-white text-ink border-y border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.1),transparent_65%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,196,120,0.14),transparent_70%)]"
      />

      <div className="relative container-page section-pad">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="text-[12px] font-semibold tracking-[0.24em] uppercase text-accent">
              Outdoor · Solar
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-ink">
              Solar lights that
              <br />
              warm the night
            </h2>
            <div className="mt-5 h-[3px] w-14 bg-accent" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Illuminate fences, patios, and garden walls with elegant up-and-down solar wall lights —
              energy free, automatic, and made for outdoor atmosphere.
            </p>

            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {features.map((item) => (
                <li key={item.title} className="border-l-2 border-accent/70 pl-4">
                  <p className="text-sm font-semibold tracking-wide text-ink">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/categories/outdoor-light"
                className="inline-flex bg-accent px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white transition-colors hover:bg-accent-deep"
              >
                Shop outdoor lights
              </Link>
              <Link
                href="/corporate"
                className="inline-flex border border-ink/20 px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Bulk / corporate order
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 bg-gradient-to-br from-accent/15 via-transparent to-transparent blur-xl"
              />
              <div className="relative overflow-hidden border border-line bg-bg-muted shadow-[0_24px_60px_rgba(16,18,24,0.1)]">
                <Image
                  src="/solar-lights.jpg"
                  alt="Modern solar street lights illuminating a walkway at night"
                  width={1200}
                  height={900}
                  className="h-auto w-full object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  priority={false}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent p-5 sm:p-6">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-accent">
                    Solar street lighting
                  </p>
                  <p className="mt-1 text-sm text-white/90">
                    Pathways · Campuses · Outdoor projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
