const testimonials = [
  {
    quote: "Clear specs and reliable delivery for our commercial fit-out in Karachi.",
    name: "Ahmed R.",
    place: "Karachi",
  },
  {
    quote: "Good support on outdoor and linear packages for a hospitality project.",
    name: "Sara K.",
    place: "Lahore",
  },
  {
    quote: "Straightforward bulk quoting — useful when we need multiple fixture types together.",
    name: "Bilal H.",
    place: "Islamabad",
  },
];

export function Testimonials() {
  return (
    <section className="section-pad bg-bg-muted">
      <div className="container-page">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">What clients say</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="border-t border-line pt-5">
              <p className="text-base leading-relaxed text-ink">{t.quote}</p>
              <footer className="mt-4 text-sm text-ink-soft">
                {t.name} · {t.place}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
