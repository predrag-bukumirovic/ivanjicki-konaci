"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Locale } from "@/lib/i18n";
import styles from "./CabinCard.module.scss";

export default function CabinImageSlider({
  images,
  fallbackImage,
  alt,
  price,
  tag,
  locale,
}: {
  images: string[];
  fallbackImage: string;
  alt: string;
  price: string;
  tag?: string;
  locale: Locale;
}) {
  const slides = images.length > 0 ? images : [fallbackImage];
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = slides.length > 1;

  const goPrev = () =>
    setActiveIndex((index) => (index === 0 ? slides.length - 1 : index - 1));

  const goNext = () =>
    setActiveIndex((index) => (index === slides.length - 1 ? 0 : index + 1));

  return (
    <div className={styles.imageWrap}>
      <Image
        src={slides[activeIndex]}
        alt={
          locale === "sr"
            ? `${alt} - fotografija ${activeIndex + 1}`
            : `${alt} - photo ${activeIndex + 1}`
        }
        fill
        className={styles.image}
        sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
      />

      <div className={styles.imageBadges}>
        <span className={styles.priceBadge}>{price}</span>
        {tag && <span className={styles.tagBadge}>{tag}</span>}
      </div>

      {hasMultipleImages && (
        <>
          <button
            type="button"
            className={`${styles.sliderBtn} ${styles.sliderPrev}`}
            onClick={goPrev}
            aria-label={
              locale === "sr"
                ? `Prethodna slika za ${alt}`
                : `Previous photo for ${alt}`
            }
          >
            <FiChevronLeft size={18} />
          </button>

          <button
            type="button"
            className={`${styles.sliderBtn} ${styles.sliderNext}`}
            onClick={goNext}
            aria-label={
              locale === "sr" ? `Sledeća slika za ${alt}` : `Next photo for ${alt}`
            }
          >
            <FiChevronRight size={18} />
          </button>

          <span className={styles.imageCounter}>
            {activeIndex + 1} / {slides.length}
          </span>

          <div
            className={styles.sliderDots}
            aria-label={locale === "sr" ? `Slike za ${alt}` : `Photos for ${alt}`}
          >
            {slides.map((src, index) => (
              <button
                type="button"
                key={`${src}-${index}`}
                className={`${styles.sliderDot} ${
                  index === activeIndex ? styles.sliderDotActive : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={
                  locale === "sr"
                    ? `Prikaži sliku ${index + 1}`
                    : `Show photo ${index + 1}`
                }
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
