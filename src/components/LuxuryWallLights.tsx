import Image from "next/image";
import Link from "next/link";

const features = [
  {
    label: "Energy Saving",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c-2.5 3-4 5.5-4 8a4 4 0 0 0 8 0c0-2.5-1.5-5-4-8Z" />
        <path d="M9 17h6M10 20h4" />
      </svg>
    ),
  },
  {
    label: "Long Life",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 1.5" />
      </svg>
    ),
  },
  {
    label: "High Brightness",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
      </svg>
    ),
  },
  {
    label: "Minimal Cost",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v10M9.5 9.5c.6-1 1.5-1.5 2.5-1.5 1.4 0 2.5.9 2.5 2s-1.1 2-2.5 2h-1c-1.4 0-2.5.9-2.5 2s1.1 2 2.5 2c1 0 1.9-.5 2.5-1.5" />
      </svg>
    ),
  },
];

const wallLights = [
  { id: "01", name: "Cube Up Down Light", spec: "LED 2 × 3W" },
  { id: "02", name: "Cylinder Up Down Light", spec: "LED 2 × 3W" },
  { id: "03", name: "Minimal Line Light", spec: "LED 6W" },
  { id: "04", name: "Spiral Wall Light", spec: "LED 12W" },
  { id: "05", name: "Oval Frame Light", spec: "LED 10W" },
  { id: "06", name: "Double Tube Light", spec: "LED 2 × 5W" },
  { id: "07", name: "Golden Oval Light", spec: "LED 10W" },
  { id: "08", name: "Fan Light Effect", spec: "LED 6W" },
  { id: "09", name: "Rectangle Loop Light", spec: "LED 10W" },
  { id: "10", name: "Round Back Light", spec: "LED 8W" },
  { id: "11", name: "Layered Rectangle", spec: "LED 12W" },
  { id: "12", name: "Diamond Shape Light", spec: "LED 10W" },
  { id: "13", name: "Strip Wall Light", spec: "LED 8W" },
  { id: "14", name: "Multi Beam Light", spec: "LED 6W" },
  { id: "15", name: "Leaf Design Light", spec: "LED 10W" },
  { id: "16", name: "Wave Wall Light", spec: "LED 10W" },
  { id: "17", name: "Barrel Up Down Light", spec: "LED 2 × 3W" },
  { id: "18", name: "Triangle Wall Light", spec: "LED 8W" },
  { id: "19", name: "Vertical Bar Light", spec: "LED 10W" },
  { id: "20", name: "Circular Line Light", spec: "LED 12W" },
];

export function LuxuryWallLights() {
  return (
    <section className="bg-[#0a0a0a] text-white">
      <div className="container-page section-pad">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Content column */}
          <div>
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <span className="font-display text-[clamp(4rem,9vw,6rem)] font-semibold leading-none tracking-tight text-accent">
                20
              </span>
              <h2 className="pb-1 font-display text-[clamp(1.35rem,2.8vw,2.2rem)] font-semibold uppercase leading-[1.12] tracking-wide">
                Luxury interior
                <br />
                wall light designs
              </h2>
            </div>

            <p className="mt-5 text-[12px] font-semibold tracking-[0.22em] uppercase text-white/65">
              Long life · Energy saving · Minimal cost
            </p>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
              Twenty decorative wall light designs for interiors — energy efficient, long lasting, and
              ready for residential or hospitality projects.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-5">
              {features.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30">
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/80">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid max-h-[220px] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {wallLights.map((light) => (
                <div
                  key={light.id}
                  className="flex items-baseline gap-2 border-b border-white/10 py-2 text-sm"
                >
                  <span className="text-[11px] font-bold text-accent">{light.id}</span>
                  <span className="truncate text-white/85">{light.name}</span>
                  <span className="ml-auto hidden shrink-0 text-[10px] uppercase tracking-wider text-white/40 sm:inline">
                    {light.spec}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/categories/decorative-lighting"
                className="inline-flex bg-accent px-6 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white hover:bg-accent-deep transition-colors"
              >
                Shop decorative
              </Link>
              <Link
                href="/corporate"
                className="inline-flex border border-white/30 px-6 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white hover:bg-white hover:text-ink transition-colors"
              >
                Bulk order
              </Link>
            </div>
          </div>

          {/* Image column */}
          <div className="relative">
            <div className="overflow-hidden border border-white/15 bg-[#111]">
              <Image
                src="/luxury-wall-lights.jpg"
                alt="20 luxury interior wall light designs — Fiam Pakistan"
                width={1200}
                height={1500}
                className="h-full w-full object-cover object-top"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
