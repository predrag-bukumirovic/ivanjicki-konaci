"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Reveal from "@/components/Reveal/Reveal";
import { getBookingReviews } from "@/data/reviews";
import type { Locale } from "@/lib/i18n";
import styles from "./Testimonials.module.scss";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Stars({ rating, locale }: { rating: number; locale: Locale }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div
      className={styles.stars}
      aria-label={
        locale === "sr" ? `Ocena ${rating} od 5` : `Rating ${rating} out of 5`
      }
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <IoStar key={`full-${i}`} size={16} />
      ))}
      {hasHalfStar && <IoStarHalf size={16} />}
    </div>
  );
}

const copy = {
  sr: {
    label: "Utisci Gostiju",
    heading: "Šta Kažu Naši Gosti",
    previous: "Prethodni utisci",
    next: "Sledeći utisci",
    showPage: "Prikaži stranu",
  },
  en: {
    label: "Guest Reviews",
    heading: "What Our Guests Say",
    previous: "Previous reviews",
    next: "Next reviews",
    showPage: "Show page",
  },
} as const;

export default function Testimonials({ locale }: { locale: Locale }) {
  const [perPage, setPerPage] = useState(1);
  const [page, setPage] = useState(0);
  const bookingReviews = useMemo(() => getBookingReviews(locale), [locale]);
  const t = copy[locale];

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setPerPage(mql.matches ? 3 : 1);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < bookingReviews.length; i += perPage) {
      chunks.push(bookingReviews.slice(i, i + perPage));
    }
    return chunks;
  }, [perPage, bookingReviews]);

  const activePage = Math.min(page, pages.length - 1);
  const activeReviews = pages[activePage] ?? [];

  const goPrev = () =>
    setPage((p) => {
      const currentPage = Math.min(p, pages.length - 1);
      return currentPage === 0 ? pages.length - 1 : currentPage - 1;
    });

  const goNext = () =>
    setPage((p) => {
      const currentPage = Math.min(p, pages.length - 1);
      return currentPage === pages.length - 1 ? 0 : currentPage + 1;
    });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Reveal className={styles.header}>
          <span className={styles.label}>{t.label}</span>
          <h2 className={styles.heading}>{t.heading}</h2>
        </Reveal>

        <div className={styles.slider}>
          <AnimatePresence mode="wait">
            <motion.div
              className={styles.grid}
              key={`${perPage}-${activePage}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeReviews.map((t) => (
                <div className={styles.card} key={`${t.name}-${t.date}`}>
                  <Stars rating={t.rating} locale={locale} />

                  <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>

                  <div className={styles.person}>
                    <span className={styles.avatar}>
                      {initials(t.name)}
                    </span>
                    <div>
                      <div className={styles.name}>{t.name}</div>
                      <div className={styles.location}>
                        {t.source} - {t.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={goPrev}
              aria-label={t.previous}
            >
              <FiChevronLeft size={18} />
            </button>

            <div className={styles.dots}>
              {pages.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  className={`${styles.dot} ${
                    i === activePage ? styles.dotActive : ""
                  }`}
                  onClick={() => setPage(i)}
                  aria-label={`${t.showPage} ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.navBtn}
              onClick={goNext}
              aria-label={t.next}
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
