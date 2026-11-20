import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm/ContactForm";
import PageHeader from "@/components/PageHeader/PageHeader";
import SectionHead from "@/components/SectionHead/SectionHead";
import { getLocale } from "@/lib/server-locale";
import { site } from "@/lib/site";
import styles from "./page.module.scss";

const content = {
  sr: {
    metadata: {
      title: "Kontakt | Ivanjički konaci",
      description:
        "Rezervacije i pitanja: telefon, email i Booking.com. Ivanjički konaci, Ivanjica.",
    },
    kicker: "Kontakt",
    title: "Rezervacije i pitanja",
    lede: "Pozovite nas ili pošaljite upit sa terminom i brojem gostiju. Slobodne termine možete videti i na Booking.com.",
    phone: "Telefon",
    email: "Email",
    online: "Online rezervacija",
    address: "Adresa",
    social: "Društvene mreže",
    formTitle: "Pošaljite upit",
    mapTitle: "Kako do nas",
    mapLede:
      "Imanje je van grada, pa je najlakše doći automobilom. Parking je obezbeđen.",
    mapLink: "Otvori u Google mapama",
    mapFrameTitle: "Mapa — Ivanjički konaci",
  },
  en: {
    metadata: {
      title: "Contact | Ivanjicki Konaci",
      description:
        "Bookings and questions: phone, email and Booking.com. Ivanjicki Konaci, Ivanjica, Serbia.",
    },
    kicker: "Contact",
    title: "Bookings and questions",
    lede: "Call us or send an inquiry with your dates and number of guests. You can also check availability on Booking.com.",
    phone: "Phone",
    email: "Email",
    online: "Book online",
    address: "Address",
    social: "Social",
    formTitle: "Send an inquiry",
    mapTitle: "Getting here",
    mapLede:
      "The property is outside town, so arriving by car is easiest. Parking is available.",
    mapLink: "Open in Google Maps",
    mapFrameTitle: "Map — Ivanjicki Konaci",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function KontaktPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <main>
      <PageHeader kicker={t.kicker} title={t.title} lede={t.lede} />

      <section className={styles.section}>
        <div className={`container ${styles.grid}`}>
          <dl className={styles.details}>
            <div>
              <dt>{t.phone}</dt>
              <dd>
                <a href={site.phoneHref} className={styles.big}>
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>{t.email}</dt>
              <dd>
                <a href={`mailto:${site.email}`} className={styles.big}>
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt>{t.online}</dt>
              <dd>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.big}
                >
                  Booking.com
                </a>
              </dd>
            </div>
            <div>
              <dt>{t.address}</dt>
              <dd>{site.address[locale]}</dd>
            </div>
            <div>
              <dt>{t.social}</dt>
              <dd className={styles.inline}>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">
                  Instagram
                </a>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="text-link">
                  Facebook
                </a>
              </dd>
            </div>
          </dl>

          <div className={styles.formWrap}>
            <h2 className={styles.formTitle}>{t.formTitle}</h2>
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className="container">
          <SectionHead title={t.mapTitle}>{t.mapLede}</SectionHead>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.480530398613!2d20.245086576847605!3d43.61735657110383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4757bd51e6de8957%3A0xdee3633a0603ae49!2sIvanjicki%20konaci%20smestaj%20sa%20restoranom!5e0!3m2!1sen!2srs!4v1787617358753!5m2!1sen!2srs"
              title={t.mapFrameTitle}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-link ${styles.mapLink}`}
          >
            {t.mapLink}
          </a>
        </div>
      </section>
    </main>
  );
}
