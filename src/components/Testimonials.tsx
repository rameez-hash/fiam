import Link from "next/link";

const testimonials = [
  {
    quote: "Clear specs and reliable delivery for our commercial fit-out in Karachi.",
    name: "Ahmed R.",
    place: "Karachi",
    focus: "Commercial fit-out",
  },
  {
    quote: "Good support on outdoor and linear packages for a hospitality project.",
    name: "Sara K.",
    place: "Lahore",
    focus: "Hospitality project",
  },
  {
    quote: "Straightforward bulk quoting, useful when we need multiple fixture types together.",
    name: "Bilal H.",
    place: "Islamabad",
    focus: "Bulk order",
  },
];

export function Testimonials() {
  return (
    <section className="section-pad bg-bg-deep text-white">
      <div className="container-page">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg">
            <p data-anim="fade" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Client feedback
            </p>
            <h2
              data-anim="lines"
              className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight"
            >
              What clients say
            </h2>
          </div>
          <Link
            data-anim="fade"
            href="/corporate"
            className="self-start text-sm font-medium text-white/70 transition-colors hover:text-white md:self-auto"
          >
            <span className="link-underline">Request a quotation</span>
          </Link>
        </div>

        <div data-anim="stagger" className="grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {testimonials.map((t, i) => (
            <blockquote key={t.name} className="relative flex flex-col">
              <span
                className="font-display text-[4.5rem] leading-none text-accent/90"
                aria-hidden
              >
                “
              </span>
              <p className="mt-2 text-[1.05rem] leading-relaxed text-white/90 sm:text-lg">
                {t.quote}
              </p>
              <footer className="mt-auto pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  {String(i + 1).padStart(2, "0")} · {t.focus}
                </p>
                <p className="mt-2 text-sm font-semibold tracking-tight">
                  {t.name}
                  <span className="font-normal text-white/50"> · {t.place}</span>
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
