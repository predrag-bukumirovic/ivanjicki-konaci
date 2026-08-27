import Reveal from "@/components/Reveal/Reveal";
import CountUp from "@/components/CountUp/CountUp";
import { getStats } from "@/data/stats";
import type { Locale } from "@/lib/i18n";
import styles from "./StatsBar.module.scss";

export default function StatsBar({
  className,
  delay = 0,
  locale,
}: {
  className?: string;
  delay?: number;
  locale: Locale;
}) {
  const stats = getStats(locale);

  return (
    <Reveal className={`${styles.stats} ${className ?? ""}`} delay={delay}>
      {stats.map((stat) => (
        <div className={styles.stat} key={stat.text}>
          <p className={styles.statText}>{stat.text}</p>
          <CountUp value={stat.value} className={styles.statNumber} />
        </div>
      ))}
    </Reveal>
  );
}
