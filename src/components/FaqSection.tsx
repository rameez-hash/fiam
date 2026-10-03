"use client";

import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    const next = openIndex === index ? -1 : index;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : 0.5;

    panels.current.forEach((panel, i) => {
      if (!panel) return;
      if (i === next) {
        gsap.fromTo(
          panel,
          { height: 0, autoAlpha: 0 },
          { height: "auto", autoAlpha: 1, duration, ease: "power3.inOut" }
        );
      } else if (i === openIndex) {
        gsap.to(panel, { height: 0, autoAlpha: 0, duration, ease: "power3.inOut" });
      }
    });
    setOpenIndex(next);
  };

  return (
    <section className="border-t border-line bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 md:py-20 lg:pl-[max(1.25rem,calc((100vw-1180px)/2))] lg:pr-12 xl:pr-16">
          <p data-anim="fade" className="flex items-center gap-2 text-sm text-ink-soft">
            <span aria-hidden>→</span>
            Asked Question
          </p>

          <h2
            data-anim="lines"
            className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.15] tracking-tight text-ink"
          >
            Have any question?
            <br />
            <span className="text-ink/50">Look here now</span>
          </h2>

          <p data-anim="fade" className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            Common questions about Fiam Pakistan products, store locations, and project or bulk
            order support.
          </p>

          <div data-anim="stagger" className="mt-8 border-t border-line">
            {items.map((item, index) => {
              const open = openIndex === index;

              return (
                <div key={item.question} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="group flex w-full items-start gap-3 py-5 text-left sm:gap-4"
                    aria-expanded={open}
                  >
                    <span className="pt-0.5 text-sm font-semibold text-ink">{index + 1}.</span>
                    <span className="flex-1 text-base font-semibold text-ink transition-colors group-hover:text-accent sm:text-lg">
                      {item.question}
                    </span>
                    <span className="relative mt-1.5 h-3 w-3 shrink-0" aria-hidden>
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink" />
                      <span
                        className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink transition-transform duration-300 ${
                          open ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>
                  <div
                    ref={(el) => {
                      panels.current[index] = el;
                    }}
                    className="overflow-hidden"
                    style={index === 0 ? undefined : { height: 0, visibility: "hidden" }}
                  >
                    <p className="pb-5 pl-7 pr-8 text-sm leading-relaxed text-ink-soft sm:pl-8">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div data-anim="image" className="relative min-h-[380px] overflow-hidden bg-bg-muted lg:min-h-[640px]">
          <Image
            src="/hero-commercial.jpg"
            alt="Fiam lighting showroom display"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
