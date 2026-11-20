import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./SectionHead.module.scss";

export default function SectionHead({
  title,
  id,
  link,
  children,
}: {
  title: string;
  id?: string;
  link?: { href: string; label: string };
  /** Optional short lede under the title. */
  children?: ReactNode;
}) {
  return (
    <div className={styles.head}>
      <div className={styles.text}>
        <h2 className={styles.title} id={id}>
          {title}
        </h2>
        {children && <p className={styles.lede}>{children}</p>}
      </div>
      {link && (
        <Link href={link.href} className={`text-link ${styles.link}`}>
          {link.label}
        </Link>
      )}
    </div>
  );
}
