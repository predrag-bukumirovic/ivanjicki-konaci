import Link from "next/link";
import styles from "./About.module.scss";
import Reveal from "@/components/Reveal/Reveal";
import StatsBar from "@/components/StatsBar/StatsBar";
import type { Locale } from "@/lib/i18n";

const copy = {
  sr: {
    label: "O Nama",
    heading:
      "Uživajte U Jednostavnijem Načinu Života. Pružamo Uslugu Za Miran I Udoban Boravak",
    text: "Nudimo različita iskustva prilagođena vašim željama. Šta god vam srce poželi, imamo idealno mesto da se opustite i obnovite energiju.",
    cta: "Saznaj Više",
  },
  en: {
    label: "About Us",
    heading:
      "Enjoy A Simpler Way Of Living. We Provide A Peaceful And Comfortable Stay",
    text: "We offer different stays tailored to your plans. Whatever kind of break you are looking for, this is a calm place to relax and recharge.",
    cta: "Learn More",
  },
} as const;

export default function About({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <span className={styles.label}>{t.label}</span>

        <Reveal className={styles.top}>
          <h2 className={styles.heading}>{t.heading}</h2>

          <div className={styles.side}>
            <p className={styles.text}>{t.text}</p>
            <Link href="/o-nama" className={styles.cta}>
              {t.cta}
            </Link>
          </div>
        </Reveal>

        <StatsBar delay={0.1} locale={locale} />
      </div>
    </section>
  );
}
