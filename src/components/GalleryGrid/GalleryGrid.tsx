"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { FiZoomIn } from "react-icons/fi";
import Reveal from "@/components/Reveal/Reveal";
import Lightbox, { type GalleryImage } from "@/components/Lightbox/Lightbox";
import type { Locale } from "@/lib/i18n";
import styles from "./GalleryGrid.module.scss";

export default function GalleryGrid({
  images,
  locale,
}: {
  images: GalleryImage[];
  locale: Locale;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className={styles.grid}>
        {images.map((image, i) => (
          <Reveal
            key={`${image.src}-${i}`}
            delay={(i % 6) * 0.06}
            className={`${styles.item} ${i % 5 === 0 ? styles.tall : ""}`}
          >
            <button
              type="button"
              className={styles.itemBtn}
              onClick={() => setOpenIndex(i)}
              aria-label={
                locale === "sr" ? `Prikaži sliku: ${image.alt}` : `Show photo: ${image.alt}`
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={styles.image}
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
              <span className={styles.overlay}>
                <FiZoomIn size={22} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

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
