import type Lenis from "lenis";

/**
 * One place for programmatic scrolling and scroll locking, so it works the same
 * with Lenis (smooth wheel scrolling on desktop) and without it (reduced motion).
 */
let lenis: Lenis | null = null;
let locks = 0;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Drop any in-flight animation and continue from the current position. */
export function resetScroll() {
  if (!lenis || locks > 0) return;
  // stop() + start() is Lenis' public way to clear velocity and target.
  lenis.stop();
  lenis.start();
}

export function scrollToY(top: number, smooth = true) {
  if (lenis) {
    lenis.scrollTo(top, { immediate: !smooth, force: true });
    return;
  }
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  window.scrollTo({ top, behavior: smooth && !reduceMotion ? "smooth" : "auto" });
}

/** Freeze page scrolling (open drawer, lightbox). Calls must be paired with unlockScroll. */
export function lockScroll() {
  locks += 1;
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  document.documentElement.style.overflow = "";
  lenis?.start();
}
