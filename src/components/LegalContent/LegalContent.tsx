import Reveal from "@/components/Reveal/Reveal";
import type { Locale } from "@/lib/i18n";
import styles from "./LegalContent.module.scss";

export type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
};

export default function LegalContent({
  updated,
  sections,
  locale,
}: {
  updated: string;
  sections: readonly LegalSection[];
  locale: Locale;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.updated}>
          {locale === "sr" ? "Poslednja izmena" : "Last updated"}: {updated}
        </p>

        {sections.map((section, i) => (
          <Reveal
            className={styles.block}
            key={section.heading}
            delay={Math.min(i * 0.05, 0.3)}
          >
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.paragraphs.map((p, j) => (
              <p className={styles.text} key={j}>
                {p}
              </p>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
