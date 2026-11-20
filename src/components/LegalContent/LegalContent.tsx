import styles from "./LegalContent.module.scss";

export type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
};

export default function LegalContent({
  sections,
}: {
  sections: readonly LegalSection[];
}) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.prose}>
          {sections.map((section) => (
            <div className={styles.block} key={section.heading}>
              <h2 className={styles.heading}>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p className={styles.text} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
