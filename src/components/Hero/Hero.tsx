"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import styles from "./Hero.module.scss";

const MotionLink = motion.create(Link);

const copy = {
  sr: {
    imageAlt: "Ivanjički konaci u prirodi",
    titleTop: "Pobegnite Od",
    titleBottom: "Gradske Vreve",
    cta: "Rezerviši svoj boravak",
  },
  en: {
    imageAlt: "Ivanjicki Konaci in nature",
    titleTop: "Escape The",
    titleBottom: "City Noise",
    cta: "Book your stay",
  },
} as const;

export default function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className={styles.hero}>
      <Image
        src="/img/naslovna.png"
        alt={t.imageAlt}
        fill
        priority
        className={styles.image}
        sizes="100vw"
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.titleTop}
          <br />
          {t.titleBottom}
        </motion.h1>
        <MotionLink
          href="/kontakt"
          className={styles.cta}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.cta}
        </MotionLink>
      </div>
    </section>
  );
}
