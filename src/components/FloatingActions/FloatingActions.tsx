"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp, FiPhone } from "react-icons/fi";
import type { Locale } from "@/lib/i18n";
import styles from "./FloatingActions.module.scss";

export default function FloatingActions({ locale }: { locale: Locale }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.stack}>
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            className={`${styles.btn} ${styles.top}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={locale === "sr" ? "Skroluj na vrh" : "Scroll to top"}
            initial={{ opacity: 0, y: 12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href="tel:+381606130776"
        className={`${styles.btn} ${styles.phone}`}
        aria-label={locale === "sr" ? "Pozovite nas" : "Call us"}
      >
        <FiPhone size={20} />
      </a>
    </div>
  );
}
