"use client";

import Image from "next/image";
import { useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="border-t border-line bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 md:py-20 lg:pl-[max(1.25rem,calc((100vw-1180px)/2))] lg:pr-12 xl:pr-16">
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <span aria-hidden>→</span>
            Asked Question
          </p>

          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.15] tracking-tight text-ink">
            Have any question?
            <br />
            <span className="text-ink/50">Look here now</span>
          </h2>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            Common questions about Fiam Pakistan products, store locations, and project or bulk
            order support.
          </p>

          <div className="mt-8 border-t border-line">
            {items.map((item, index) => {
              const open = openIndex === index;

              return (
                <div key={item.question} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className="flex w-full items-start gap-3 py-5 text-left sm:gap-4"
                    aria-expanded={open}
                  >
                    <span className="pt-0.5 text-sm font-semibold text-ink">{index + 1}.</span>
                    <span className="flex-1 text-base font-semibold text-ink sm:text-lg">
                      {item.question}
                    </span>
                    <span className="mt-0.5 text-xl leading-none text-ink-soft" aria-hidden>
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open && (
                    <p className="pb-5 pl-7 pr-8 text-sm leading-relaxed text-ink-soft sm:pl-8">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[380px] bg-bg-muted lg:min-h-[640px]">
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
