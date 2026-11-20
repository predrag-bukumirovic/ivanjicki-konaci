import { getBookingReviews } from "@/data/reviews";
import type { Locale } from "@/lib/i18n";
import styles from "./Reviews.module.scss";

const months: Record<Locale, string[]> = {
  sr: [
    "januar",
    "februar",
    "mart",
    "april",
    "maj",
    "jun",
    "jul",
    "avgust",
    "septembar",
    "oktobar",
    "novembar",
    "decembar",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

/** Booking dates are dd/mm/yyyy → "jul 2024" / "July 2024". */
function formatDate(date: string, locale: Locale) {
  const [, month, year] = date.split("/");
  const name = months[locale][Number(month) - 1];
  return name ? `${name} ${year}` : date;
}

export default function Reviews({
  locale,
  limit,
}: {
  locale: Locale;
  limit?: number;
}) {
  const reviews = getBookingReviews(locale).slice(0, limit);

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li className={styles.review} key={`${review.name}-${review.date}`}>
          <blockquote className={styles.quote}>
            <p>{review.quote}</p>
          </blockquote>
          <p className={styles.by}>
            <strong>{review.name}</strong>
            <span>
              {review.source} · {formatDate(review.date, locale)}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}
