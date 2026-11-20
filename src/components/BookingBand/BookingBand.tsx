import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import styles from "./BookingBand.module.scss";

const copy = {
  sr: {
    heading: "Rezervacije",
    text: "Pozovite nas ili pošaljite email sa terminom i brojem gostiju. Slobodne termine možete proveriti i na Booking.com.",
    phone: "Telefon",
    email: "Email",
    online: "Online",
  },
  en: {
    heading: "Bookings",
    text: "Call us or send an email with your dates and number of guests. You can also check availability on Booking.com.",
    phone: "Phone",
    email: "Email",
    online: "Online",
  },
} as const;

export default function BookingBand({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className={styles.band} aria-labelledby="booking-band-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <h2 className={styles.heading} id="booking-band-title">
            {t.heading}
          </h2>
          <p className={styles.text}>{t.text}</p>
        </div>

        <dl className={styles.list}>
          <div className={styles.row}>
            <dt>{t.phone}</dt>
            <dd>
              <a href={site.phoneHref}>{site.phone}</a>
            </dd>
          </div>
          <div className={styles.row}>
            <dt>{t.email}</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div className={styles.row}>
            <dt>{t.online}</dt>
            <dd>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                Booking.com
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
