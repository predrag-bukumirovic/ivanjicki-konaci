import type { ReactNode } from "react";
import styles from "./PageHeader.module.scss";

export default function PageHeader({
  kicker,
  title,
  lede,
  children,
}: {
  kicker?: string;
  title: string;
  lede?: string;
  /** Optional actions shown under the lede (buttons, links). */
  children?: ReactNode;
}) {
  return (
    <header className={styles.header}>
      <div className="container">
        {kicker && <p className={styles.kicker}>{kicker}</p>}
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </header>
  );
}
