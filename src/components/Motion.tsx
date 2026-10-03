"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const EASE = "power3.out";

function q<T extends Element = HTMLElement>(selector: string, root: ParentNode = document) {
  return gsap.utils.toArray<T>(root.querySelectorAll(selector));
}

/**
 * Scroll and entrance animations driven by data attributes:
 *  data-anim="lines"   heading revealed line by line behind a mask
 *  data-anim="fade"    short rise + fade
 *  data-anim="stagger" direct children rise in sequence
 *  data-anim="image"   clip wipe from bottom with a slow settle on the inner image
 *  data-anim="count"   number counts up from 0
 *  data-parallax="n"   image drifts n% while its section scrolls past
 *  data-delay="s"      extra delay for above-the-fold items
 */
export function Motion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };
          const animated = q("[data-anim]");

          if (reduced) {
            gsap.set(animated, { autoAlpha: 1, clearProps: "transform" });
            root.dataset.motion = "on";
            return;
          }

          const delayOf = (el: HTMLElement) => Number(el.dataset.delay || 0);
          const inView = (el: HTMLElement) => el.getBoundingClientRect().top < window.innerHeight * 0.92;
          const trigger = (el: HTMLElement) =>
            inView(el) ? undefined : { trigger: el, start: "top 88%", once: true };

          q("[data-anim='lines']").forEach((el) => {
            gsap.set(el, { autoAlpha: 1 });
            const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
            gsap.from(split.lines, {
              yPercent: 105,
              duration: 1.05,
              ease: "expo.out",
              stagger: 0.09,
              delay: delayOf(el),
              scrollTrigger: trigger(el),
            });
          });

          q("[data-anim='fade']").forEach((el) => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 26 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: EASE,
                delay: delayOf(el),
                scrollTrigger: trigger(el),
              }
            );
          });

          q("[data-anim='stagger']").forEach((el) => {
            gsap.set(el, { autoAlpha: 1 });
            const items = Array.from(el.children);
            gsap.fromTo(
              items,
              { autoAlpha: 0, y: 34 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.85,
                ease: EASE,
                stagger: 0.08,
                delay: delayOf(el),
                scrollTrigger: trigger(el),
              }
            );
          });

          q("[data-anim='image']").forEach((el) => {
            gsap.set(el, { autoAlpha: 1 });
            const media = el.querySelector("img");
            const tl = gsap.timeline({ delay: delayOf(el), scrollTrigger: trigger(el) });
            tl.fromTo(
              el,
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" }
            );
            if (media) {
              tl.fromTo(media, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0.1);
            }
          });

          q("[data-anim='count']").forEach((el) => {
            gsap.set(el, { autoAlpha: 1 });
            const target = Number(el.dataset.value || el.textContent || 0);
            const state = { n: 0 };
            gsap.to(state, {
              n: target,
              duration: 1.6,
              ease: "power2.out",
              delay: delayOf(el),
              scrollTrigger: trigger(el),
              onUpdate: () => {
                el.textContent = String(Math.round(state.n));
              },
            });
          });

          q("[data-parallax]").forEach((el) => {
            const amount = Number(el.dataset.parallax || 10);
            gsap.fromTo(
              el,
              { yPercent: -amount / 2 },
              {
                yPercent: amount / 2,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement || el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });

          root.dataset.motion = "on";
        }
      );

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);

      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  return null;
}
