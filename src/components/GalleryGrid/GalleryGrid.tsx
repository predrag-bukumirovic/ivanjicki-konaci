"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import Lightbox, { type GalleryImage } from "@/components/Lightbox/Lightbox";
import type { Locale } from "@/lib/i18n";
import styles from "./GalleryGrid.module.scss";

/** Masonry grid: every photo keeps its own shape (most are portrait). */
export default function GalleryGrid({
  images,
  locale,
}: {
  images: (GalleryImage & { width: number; height: number })[];
  locale: Locale;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul className={styles.grid}>
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              className={styles.item}
              onClick={() => setOpenIndex(i)}
              aria-label={
                locale === "sr"
                  ? `Otvori fotografiju ${i + 1} od ${images.length}: ${image.alt}`
                  : `Open photo ${i + 1} of ${images.length}: ${image.alt}`
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority={i < 4}
                className={styles.image}
                sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 300px"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            images={images}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
            locale={locale}
          />
        )}
      </AnimatePresence>
    </>
  );
}
