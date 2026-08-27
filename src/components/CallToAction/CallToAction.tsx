import Link from "next/link";
import styles from "./CallToAction.module.scss";
import Reveal from "@/components/Reveal/Reveal";
import { commonCopy, type Locale } from "@/lib/i18n";

const copy = {
  sr: {
    heading: "Spremni Ste Za Beg Od Gradske Vreve?",
    text: "Rezervišite svoj konak već danas i doživite mir prirode koji zaslužujete.",
  },
  en: {
    heading: "Ready To Escape The City Noise?",
    text: "Book your stay today and experience the peace of nature you deserve.",
  },
} as const;

export default function CallToAction({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Reveal className={styles.banner}>
          <h2 className={styles.heading}>{t.heading}</h2>
          <p className={styles.text}>{t.text}</p>
          <Link href="/kontakt" className={styles.cta}>
            {commonCopy[locale].bookNow}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
