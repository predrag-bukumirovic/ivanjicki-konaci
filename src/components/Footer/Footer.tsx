import Link from "next/link";
import { commonCopy, type Locale } from "@/lib/i18n";
import styles from "./Footer.module.scss";

const navLinkKeys = [
  { key: "home", href: "/" },
  { key: "rooms", href: "/konaci" },
  { key: "restaurant", href: "/restoran" },
  { key: "menu", href: "/meni" },
  { key: "gallery", href: "/galerija" },
  { key: "about", href: "/o-nama" },
  { key: "contact", href: "/kontakt" },
] as const;

const copy = {
  sr: {
    about: "O Nama",
    line1: "Toplo I Svetlo,",
    line2: "Bezvremenski Moderno,",
    line3: "Prirodno Udobno.",
    navigation: "Navigacija",
    contact: "Kontakt",
    address: "Kneza Miloša bb, Ivanjica, Srbija",
    follow: "Pratite Nas",
    rights: "© 2026 Ivanjički Konaci. Sva Prava Zadržana.",
    terms: "Uslovi Korišćenja",
    privacy: "Politika Privatnosti",
    credit: "Izradio",
  },
  en: {
    about: "About",
    line1: "Warm And Bright,",
    line2: "Timelessly Modern,",
    line3: "Naturally Comfortable.",
    navigation: "Navigation",
    contact: "Contact",
    address: "Kneza Milosa bb, Ivanjica, Serbia",
    follow: "Follow Us",
    rights: "© 2026 Ivanjicki Konaci. All Rights Reserved.",
    terms: "Terms Of Use",
    privacy: "Privacy Policy",
    credit: "Built by",
  },
} as const;

export default function Footer({ locale }: { locale: Locale }) {
  const labels = commonCopy[locale];
  const t = copy[locale];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.col}>
            <span className={styles.colTitle}>{t.about}</span>
            <span>{t.line1}</span>
            <span>{t.line2}</span>
            <span>{t.line3}</span>
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>{t.navigation}</span>
            {navLinkKeys.map((link) => (
              <Link href={link.href} key={link.key}>
                {labels[link.key]}
              </Link>
            ))}
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>{t.contact}</span>
            <a href="mailto:ivanjicki.konaci@gmail.com">
              ivanjicki.konaci@gmail.com
            </a>
            <a href="tel:+381606130776">+381 60 6130776</a>
            <span>{t.address}</span>
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>{t.follow}</span>
            <a
              href="https://www.facebook.com/ivanjickikonaci1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/ivanjicki.konaci/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>{t.rights}</span>
          <div className={styles.bottomLinks}>
            <Link href="/uslovi-koriscenja">{t.terms}</Link>
            <Link href="/politika-privatnosti">{t.privacy}</Link>
            <a
              href="https://scaons.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.credit}
            >
              {t.credit} <u>SCAONS</u>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
