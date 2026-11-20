"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Locale } from "@/lib/i18n";
import styles from "./RoomPhotos.module.scss";

/** Swipeable photo strip (native scroll-snap) with arrows on larger screens. */
export default function RoomPhotos({
  images,
  name,
  locale,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 55vw",
}: {
  images: string[];
  name: string;
  locale: Locale;
  priority?: boolean;
  sizes?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  const scrollTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = (next + count) % count;
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className={styles.photos}>
      <div
        className={styles.track}
        ref={trackRef}
        onScroll={(event) => {
          const track = event.currentTarget;
          setIndex(Math.round(track.scrollLeft / track.clientWidth));
        }}
        tabIndex={0}
        aria-label={
          locale === "sr" ? `Fotografije: ${name}` : `Photos: ${name}`
        }
      >
        {images.map((src, i) => (
          <div className={styles.slide} key={src}>
            <Image
              src={src}
              alt={
                locale === "sr"
                  ? `${name}, fotografija ${i + 1} od ${count}`
                  : `${name}, photo ${i + 1} of ${count}`
              }
              fill
              priority={priority && i === 0}
              sizes={sizes}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <span className={styles.counter} aria-hidden>
            {index + 1} / {count}
          </span>
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            onClick={() => scrollTo(index - 1)}
            aria-label={locale === "sr" ? "Prethodna fotografija" : "Previous photo"}
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={() => scrollTo(index + 1)}
            aria-label={locale === "sr" ? "Sledeća fotografija" : "Next photo"}
          >
            <FiChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
