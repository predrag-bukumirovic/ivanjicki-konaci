import Link from "next/link";
import { commonCopy, type Locale } from "@/lib/i18n";
import styles from "./PageHeader.module.scss";

export default function PageHeader({
  title,
  subtitle,
  locale,
}: {
  title: string;
  subtitle?: string;
  locale: Locale;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">{commonCopy[locale].home}</Link>
          <span>/</span>
          <span>{title}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </header>
  );
}
