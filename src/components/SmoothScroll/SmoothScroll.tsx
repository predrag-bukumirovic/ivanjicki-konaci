"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { resetScroll, setLenis } from "@/lib/smooth-scroll";

/**
 * Smooth mouse-wheel / trackpad scrolling for the whole site.
 * Touch scrolling stays native, and it is skipped entirely for reduced motion.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      // Lets scrollable areas inside the page (menu sidebar, drawer, textarea) scroll on their own.
      allowNestedScroll: true,
      // In-page #links: stop below the fixed header.
      anchors: { offset: -88 },
    });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  // A new page starts where Next.js puts it, not where the last animation was heading.
  useEffect(() => {
    resetScroll();
  }, [pathname]);

  return null;
}
