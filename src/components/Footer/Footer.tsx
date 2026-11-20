import Image from "next/image";
import Link from "next/link";
import { commonCopy, navLinks, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import styles from "./Footer.module.scss";

const copy = {
  sr: {
    brand: "Ivanjički konaci",
    tagline: "Smeštaj, restoran i bazen nadomak Ivanjice.",
    pages: "Stranice",
    contact: "Kontakt",
    follow: "Pratite nas",
    rights: "© 2026 Ivanjički konaci",
    terms: "Uslovi korišćenja",
    privacy: "Politika privatnosti",
    credit: "Izradio",
  },
  en: {
    brand: "Ivanjicki Konaci",
    tagline: "Rooms, restaurant and pool just outside Ivanjica.",
    pages: "Pages",
    contact: "Contact",
    follow: "Follow",
    rights: "© 2026 Ivanjicki Konaci",
    terms: "Terms of use",
    privacy: "Privacy policy",
    credit: "Built by",
  },
} as const;

export default function Footer({ locale }: { locale: Locale }) {
  const labels = commonCopy[locale];
  const t = copy[locale];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand}>
            <Image src="/img/logo.png" alt="" width={44} height={44} />
            <span>{t.brand}</span>
          </Link>
          <p className={styles.tagline}>{t.tagline}</p>
          <p className={styles.address}>{site.address[locale]}</p>
        </div>

        <div className={`${styles.col} ${styles.pages}`}>
          <h2 className={styles.colTitle}>{t.pages}</h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link href={link.href}>{labels[link.key]}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.col} ${styles.contact}`}>
          <h2 className={styles.colTitle}>{t.contact}</h2>
          <ul>
            <li>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                Booking.com
              </a>
            </li>
          </ul>
        </div>

        <div className={`${styles.col} ${styles.social}`}>
          <h2 className={styles.colTitle}>{t.follow}</h2>
          <ul>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className={styles.bottom}>
          <span>{t.rights}</span>
          <div className={styles.bottomLinks}>
            <Link href="/uslovi-koriscenja">{t.terms}</Link>
            <Link href="/politika-privatnosti">{t.privacy}</Link>
            <a
              href="https://scaons.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.credit} SCAONS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
