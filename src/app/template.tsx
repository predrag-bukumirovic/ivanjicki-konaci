import type { ReactNode } from "react";
import styles from "./template.module.scss";

/**
 * Unlike layout.tsx, a template re-mounts on every navigation,
 * so each new page plays a short entrance.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}
