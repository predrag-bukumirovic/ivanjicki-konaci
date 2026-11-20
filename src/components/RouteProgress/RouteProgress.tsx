"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./RouteProgress.module.scss";

type Phase = "idle" | "loading" | "done";

/** Is this click a same-site navigation to a different page? */
function isPageNavigation(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;

  const link = (event.target as Element | null)?.closest?.("a");
  if (!link || !link.href) return false;
  if (link.target && link.target !== "_self") return false;
  if (link.hasAttribute("download")) return false;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  // Same page (or just a #hash on it) — nothing loads.
  return url.pathname !== window.location.pathname || url.search !== window.location.search;
}

/** Thin progress line at the top of the screen while the next page loads. */
export default function RouteProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [lastPathname, setLastPathname] = useState(pathname);

  // The new page has rendered: finish the line (React's "adjust state on prop change" pattern).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (phase === "loading") setPhase("done");
  }

  useEffect(() => {
    const start = () => setPhase("loading");
    const onClick = (event: MouseEvent) => {
      if (isPageNavigation(event)) start();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", start);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", start);
    };
  }, []);

  useEffect(() => {
    if (phase === "idle") return;
    // "done": let the line finish and fade, then reset.
    // "loading": safety net in case the navigation never completes.
    const timer = window.setTimeout(
      () => setPhase(phase === "done" ? "idle" : "done"),
      phase === "done" ? 500 : 10000,
    );
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <div
      className={`${styles.track} ${phase !== "idle" ? styles[phase] : ""}`}
      aria-hidden
    >
      <span className={styles.bar} />
    </div>
  );
}
