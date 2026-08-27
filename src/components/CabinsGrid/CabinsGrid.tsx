import Link from "next/link";
import Reveal from "@/components/Reveal/Reveal";
import CabinCard from "@/components/CabinCard/CabinCard";
import { getCabins } from "@/data/cabins";
import type { Locale } from "@/lib/i18n";
import styles from "./CabinsGrid.module.scss";

const copy = {
  sr: {
    label: "Smeštajne Jedinice",
    heading: "Izaberite Sobu Koja Odgovara Vašem Boravku",
    cta: "Pogledaj Sve Sobe",
  },
  en: {
    label: "Accommodation",
    heading: "Choose The Room That Fits Your Stay",
    cta: "View All Rooms",
  },
} as const;

export default function CabinsGrid({
  limit,
  locale,
}: {
  limit?: number;
  locale: Locale;
}) {
  const cabins = getCabins(locale);
  const visibleCabins = typeof limit === "number" ? cabins.slice(0, limit) : cabins;
  const t = copy[locale];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Reveal className={styles.header}>
          <div>
            <span className={styles.label}>{t.label}</span>
            <h2 className={styles.heading}>{t.heading}</h2>
          </div>

          <Link href="/konaci" className={styles.cta}>
            {t.cta}
          </Link>
        </Reveal>

        <div className={styles.grid}>
          {visibleCabins.map((cabin, i) => (
            <CabinCard
              cabin={cabin}
              delay={i * 0.12}
              key={cabin.slug}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
