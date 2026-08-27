"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Locale } from "@/lib/i18n";
import styles from "./Lightbox.module.scss";

export type GalleryImage = {
  src: string;
  alt: string;
};

export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
  locale,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  locale: Locale;
}) {
  const goPrev = useCallback(
    () => onNavigate(index === 0 ? images.length - 1 : index - 1),
    [index, images.length, onNavigate]
  );

  const goNext = useCallback(
    () => onNavigate(index === images.length - 1 ? 0 : index + 1),
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  const current = images[index];

  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <span className={styles.counter}>
        {index + 1} / {images.length}
      </span>

      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label={locale === "sr" ? "Zatvori" : "Close"}
      >
        <FiX size={22} />
      </button>

      <button
        type="button"
        className={`${styles.navBtn} ${styles.prev}`}
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label={locale === "sr" ? "Prethodna slika" : "Previous photo"}
      >
        <FiChevronLeft size={24} />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          className={styles.imageWrap}
          key={current.src + index}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="90vw"
            style={{ objectFit: "contain" }}
            priority
          />
          <span className={styles.caption}>{current.alt}</span>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        className={`${styles.navBtn} ${styles.next}`}
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label={locale === "sr" ? "Sledeća slika" : "Next photo"}
      >
        <FiChevronRight size={24} />
      </button>
    </motion.div>
  );
}
