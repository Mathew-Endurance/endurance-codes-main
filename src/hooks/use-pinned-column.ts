import { useEffect, type RefObject } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Below this width the columns stack, so pinning would trap the content. */
const MIN_WIDTH = 1024;

/**
 * Pins `target` inside `container` while the container scrolls past, and
 * scrubs a subtle parallax lift on the pinned element.
 *
 * GSAP is imported lazily so it stays out of the initial bundle — the effect
 * only matters once the user has scrolled to the projects section anyway.
 *
 * Disabled under reduced motion and on narrow viewports.
 */
export function usePinnedColumn(
  container: RefObject<HTMLElement | null>,
  target: RefObject<HTMLElement | null>,
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia(`(min-width: ${MIN_WIDTH}px)`).matches) return;
    if (!container.current || !target.current) return;

    let cleanup = () => {};
    let cancelled = false;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !container.current || !target.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container.current!,
          start: "top 20%",
          // Stop pinning before the container leaves, so the release is not abrupt.
          end: "bottom 85%",
          pin: target.current!,
          pinSpacing: false,
          // Smooths trackpad scrolling — the pin catches up over ~0.6s
          // instead of tracking every jittery wheel event.
          scrub: 0.6,
          invalidateOnRefresh: true,
        });

        gsap.fromTo(
          target.current!,
          { y: 0 },
          {
            y: -24,
            ease: "none",
            scrollTrigger: {
              trigger: container.current!,
              start: "top 20%",
              end: "bottom 85%",
              scrub: 0.6,
            },
          },
        );
      }, container);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [container, target, reduced]);
}
