"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { company } from "@/data/products";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function BrandMarquee() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const track = scope.current?.querySelector<HTMLElement>(".marquee-track");
      if (!track) return;

      const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      loop.totalTime(loop.duration() * 1000);
      let direction = 1;

      ScrollTrigger.create({
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          direction = self.direction;
          const boost = Math.min(Math.abs(self.getVelocity()) / 300, 5);
          gsap.to(loop, {
            timeScale: direction * (1 + boost),
            duration: 0.25,
            overwrite: true,
            onComplete: () => {
              gsap.to(loop, { timeScale: direction, duration: 1.2, ease: "power2.out" });
            },
          });
        },
      });
    },
    { scope }
  );

  const row = [...company.brands, ...company.brands];

  return (
    <section ref={scope} className="overflow-hidden border-y border-line bg-white py-6" aria-label="Our brands">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {row.map((brand, i) => (
              <li key={`${brand.name}-${i}`} className="flex items-center gap-4 px-8">
                <span className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold tracking-tight text-ink">
                  {brand.name}
                </span>
                <span className="text-sm text-ink-soft">{brand.focus}</span>
                <span className="ml-8 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
