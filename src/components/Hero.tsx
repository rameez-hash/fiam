"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/products";

gsap.registerPlugin(useGSAP);

const SLIDE_MS = 7000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const scope = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const progress = useRef<gsap.core.Tween | null>(null);

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    progress.current?.kill();
    progress.current = null;
  };

  const startProgress = useCallback((active: number) => {
    clearTimer();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bars = scope.current?.querySelectorAll<HTMLElement>(".hero-bar");
    if (!bars?.length) return;

    bars.forEach((bar, i) => {
      gsap.set(bar, { scaleX: i < active ? 1 : 0, transformOrigin: "left center" });
    });

    const bar = bars[active];
    if (!bar) return;

    if (reduced) {
      gsap.set(bar, { scaleX: 1 });
      return;
    }

    progress.current = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: SLIDE_MS / 1000,
        ease: "none",
        onComplete: () => setIndex((i) => (i + 1) % heroSlides.length),
      }
    );
  }, []);

  const goTo = (next: number) => {
    if (next === index) return;
    setIndex(next);
  };

  useEffect(() => {
    startProgress(index);
    return clearTimer;
  }, [index, startProgress]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) progress.current?.pause();
      else progress.current?.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const content = root.querySelector<HTMLElement>(".hero-content");
      if (!content) return;

      const lines = gsap.utils.toArray<HTMLElement>(".hero-line", content);
      const fades = gsap.utils.toArray<HTMLElement>(".hero-fade", content);

      // Always land at a readable state first so mask tweens don't leave titles stuck off-screen.
      gsap.set(lines, { yPercent: 0, y: 0, autoAlpha: 1 });
      gsap.set(fades, { y: 0, autoAlpha: 1 });
      if (reduced) return;

      gsap.fromTo(
        lines,
        { yPercent: 110, y: 0, autoAlpha: 1 },
        { yPercent: 0, y: 0, autoAlpha: 1, duration: 0.95, stagger: 0.08, ease: "expo.out" }
      );
      gsap.fromTo(
        fades,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.06, ease: "power3.out", delay: 0.15 }
      );
    },
    { dependencies: [index], scope }
  );

  const slide = heroSlides[index];
  const titleLines = slide.title.split("\n");
  const secondaryHref = slide.ctaHref === "/corporate" ? "/contact" : "/corporate";
  const secondaryLabel = slide.ctaHref === "/corporate" ? "Contact us" : "Corporate orders";

  return (
    <section
      ref={scope}
      className="relative isolate min-h-[86vh] overflow-hidden bg-bg-deep text-white"
    >
      {heroSlides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "z-[1] opacity-100" : "z-0 opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt={s.title.replace("\n", " ")}
            fill
            priority={i === 0}
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Readability scrims: left for copy, bottom for CTAs + nav */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 container-page flex min-h-[86vh] flex-col justify-end gap-10 pb-12 pt-28 sm:gap-14 sm:pb-14">
        <div key={index} className="hero-content max-w-2xl">
          <p className="hero-fade flex items-center gap-3 text-sm text-white/85 drop-shadow-sm">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </span>
            <span className="h-px w-10 bg-white/50" aria-hidden />
            Fiam Pakistan
          </p>

          <h1 className="mt-5 text-[clamp(2.1rem,4.6vw,4.1rem)] font-semibold leading-[1.1] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
            {titleLines.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span className="hero-line block whitespace-nowrap will-change-transform">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-5 max-w-lg text-[15px] leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
            {slide.subtitle}
          </p>

          <div className="hero-fade mt-8 flex flex-wrap gap-3">
            <Link
              href={slide.ctaHref || "/products"}
              className="inline-flex bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/25 transition-colors hover:bg-accent-deep"
            >
              {slide.ctaLabel || "View products"}
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex border border-white/70 bg-black/25 px-6 py-3 text-sm font-medium text-white backdrop-blur-[2px] transition-colors hover:bg-white hover:text-ink"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>

        <div
          className="grid max-w-lg gap-3"
          style={{ gridTemplateColumns: `repeat(${heroSlides.length}, minmax(0, 1fr))` }}
        >
          {heroSlides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className="group py-2 text-left"
            >
              <span className="relative block h-[2px] overflow-hidden bg-white/35">
                <span
                  ref={i === index ? barRef : undefined}
                  className="hero-bar absolute inset-0 origin-left scale-x-0 bg-white"
                />
              </span>
              <span
                className={`mt-2 hidden truncate text-xs drop-shadow-sm transition-colors sm:block ${
                  i === index ? "text-white" : "text-white/55 group-hover:text-white/85"
                }`}
              >
                {s.label || s.title.replace("\n", " ")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
