import { FiExternalLink } from "react-icons/fi";
import Reveal from "@/components/Reveal/Reveal";
import type { Cabin } from "@/data/cabins";
import { commonCopy, type Locale } from "@/lib/i18n";
import CabinImageSlider from "./CabinImageSlider";
import styles from "./CabinCard.module.scss";

export default function CabinCard({
  cabin,
  delay = 0,
  locale,
}: {
  cabin: Cabin;
  delay?: number;
  locale: Locale;
}) {
  const copy = commonCopy[locale];

  return (
    <Reveal className={styles.card} delay={delay} hover>
      <CabinImageSlider
        images={cabin.images}
        fallbackImage={cabin.image}
        alt={cabin.name}
        price={cabin.price}
        tag={cabin.tag}
        locale={locale}
      />

      <div className={styles.body}>
        <h3 className={styles.name}>{cabin.name}</h3>
        <p className={styles.location}>{cabin.location}</p>
        <p className={styles.description}>{cabin.description}</p>

        <div className={styles.badges}>
          {cabin.badges.map((badge) => (
            <span className={styles.badge} key={badge.label}>
              <badge.icon size={15} />
              {badge.label}
            </span>
          ))}
        </div>

        <a
          href={cabin.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bookingCta}
          aria-label={
            locale === "sr"
              ? `Proveri dostupnost za ${cabin.name}`
              : `Check availability for ${cabin.name}`
          }
        >
          {copy.checkAvailability}
          <FiExternalLink size={16} />
        </a>
      </div>
    </Reveal>
  );
}
