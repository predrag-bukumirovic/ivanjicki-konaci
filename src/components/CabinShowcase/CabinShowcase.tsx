import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Reveal from "@/components/Reveal/Reveal";
import { getCabins } from "@/data/cabins";
import { commonCopy, type Locale } from "@/lib/i18n";
import styles from "./CabinShowcase.module.scss";

const copy = {
  sr: {
    label: "Dostupno Za Rezervaciju",
    heading: "Proverite Sobe Sa Stvarnim Fotografijama I Detaljima",
    previous: "Prethodni konak",
    next: "Sledeći konak",
    upTo: "do",
    guests: "gostiju",
  },
  en: {
    label: "Available To Book",
    heading: "Explore Rooms With Real Photos And Precise Details",
    previous: "Previous room",
    next: "Next room",
    upTo: "up to",
    guests: "guests",
  },
} as const;

export default function CabinShowcase({ locale }: { locale: Locale }) {
  const featuredCabin = getCabins(locale)[0];
  const t = copy[locale];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Reveal className={styles.header}>
          <div>
            <span className={styles.label}>{t.label}</span>
            <h2 className={styles.heading}>{t.heading}</h2>
          </div>

          <div className={styles.nav}>
            <button
              type="button"
              className={styles.navBtn}
              disabled
              aria-label={t.previous}
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              type="button"
              className={styles.navBtn}
              aria-label={t.next}
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </Reveal>

        <Reveal className={styles.card} delay={0.15}>
          <div className={styles.imageWrap}>
            <Image
              src={featuredCabin.image}
              alt={featuredCabin.name}
              fill
              className={styles.image}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>

          <div className={styles.info}>
            <div className={styles.infoTop}>
              <div>
                <h3 className={styles.name}>{featuredCabin.name}</h3>
                <p className={styles.location}>{featuredCabin.location}</p>
              </div>
              <span className={styles.price}>
                {featuredCabin.size}
                <span>
                  {" "}
                  / {t.upTo} {featuredCabin.maxOccupancy} {t.guests}
                </span>
              </span>
            </div>

            <p className={styles.desc}>{featuredCabin.description}</p>

            <div className={styles.badges}>
              {featuredCabin.badges.map((badge) => (
                <span className={styles.badge} key={badge.label}>
                  <badge.icon size={16} />
                  {badge.label}
                </span>
              ))}
            </div>

            <Link href="/kontakt" className={styles.cta}>
              {commonCopy[locale].bookNow}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
