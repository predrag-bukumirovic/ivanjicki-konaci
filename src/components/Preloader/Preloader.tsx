"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { PRELOADER_SEEN_CLASS, PRELOADER_SEEN_KEY } from "@/lib/preloader";
import styles from "./Preloader.module.scss";

const MIN_VISIBLE_MS = 700;
const MAX_WAIT_MS = 2500;
const EXIT_MS = 700;

export default function Preloader({ locale }: { locale: Locale }) {
  const [phase, setPhase] = useState<"intro" | "leaving" | "done">("intro");

  useEffect(() => {
    // Already seen in this visit: the CSS hides it before paint; just unmount.
    if (document.documentElement.classList.contains(PRELOADER_SEEN_CLASS)) {
      const frame = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(frame);
    }

    const startedAt = performance.now();
    const timers: number[] = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt));
      timers.push(
        window.setTimeout(() => {
          setPhase("leaving");
          try {
            sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
          } catch {
            // Private mode etc. — the intro simply plays again next time.
          }
          timers.push(window.setTimeout(() => setPhase("done"), EXIT_MS));
        }, wait),
      );
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    timers.push(window.setTimeout(finish, MAX_WAIT_MS));

    return () => {
      window.removeEventListener("load", finish);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`${styles.preloader} ${phase === "leaving" ? styles.leaving : ""}`}
      aria-hidden
    >
      <div className={styles.inner}>
        <Image src="/img/logo.png" alt="" width={64} height={64} priority />
        <span className={styles.name}>
          {locale === "sr" ? "Ivanjički konaci" : "Ivanjicki Konaci"}
        </span>
        <span className={styles.bar}>
          <span />
        </span>
      </div>
    </div>
  );
}
