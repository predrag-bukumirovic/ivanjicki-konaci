import type { Metadata } from "next";
import { IoMailOutline, IoCallOutline, IoLocationOutline } from "react-icons/io5";
import PageHeader from "@/components/PageHeader/PageHeader";
import Reveal from "@/components/Reveal/Reveal";
import ContactForm from "@/components/ContactForm/ContactForm";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/i18n";
import styles from "./page.module.scss";

const content = {
  sr: {
    metadata: {
      title: "Kontakt | Ivanjički Konaci",
      description:
        "Kontaktirajte nas za rezervacije i sva pitanja u vezi sa Ivanjičkim konacima.",
    },
    title: "Kontakt",
    subtitle:
      "Tu smo za sva pitanja i rezervacije, javite nam se i odgovorićemo u najkraćem roku.",
    label: "Javite Nam Se",
    heading: "Ostanimo U Kontaktu",
    text: "Bilo da planirate boravak za dvoje ili veću grupu, rado ćemo vam pomoći da pronađete konak koji vam najviše odgovara.",
    address: "Kneza Miloša bb, Ivanjica, Srbija",
    formHeading: "Pošaljite Nam Poruku",
    location: "Lokacija",
    mapHeading: "Kako Do Nas",
    mapTitle: "Mapa - Ivanjički Konaci",
  },
  en: {
    metadata: {
      title: "Contact | Ivanjicki Konaci",
      description:
        "Contact us for reservations and any questions about Ivanjicki Konaci.",
    },
    title: "Contact",
    subtitle:
      "We are here for questions and reservations. Get in touch and we will reply as soon as possible.",
    label: "Get In Touch",
    heading: "Stay In Contact",
    text: "Whether you are planning a stay for two or a larger group, we will gladly help you find the room that suits you best.",
    address: "Kneza Milosa bb, Ivanjica, Serbia",
    formHeading: "Send Us A Message",
    location: "Location",
    mapHeading: "How To Find Us",
    mapTitle: "Map - Ivanjicki Konaci",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function KontaktPage() {
  const locale: Locale = await getLocale();
  const t = content[locale];

  return (
    <main>
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        locale={locale}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <Reveal className={styles.info}>
              <span className={styles.infoLabel}>{t.label}</span>
              <h2 className={styles.infoHeading}>{t.heading}</h2>
              <p className={styles.infoText}>{t.text}</p>

              <div className={styles.infoCard}>
                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>
                    <IoMailOutline size={18} />
                  </span>
                  <a href="mailto:ivanjicki.konaci@gmail.com">
                    ivanjicki.konaci@gmail.com
                  </a>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>
                    <IoCallOutline size={18} />
                  </span>
                  <a href="tel:+381606130776">+381 60 6130776</a>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>
                    <IoLocationOutline size={18} />
                  </span>
                  <span>{t.address}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className={styles.formCard}>
              <h3 className={styles.formHeading}>{t.formHeading}</h3>
              <ContactForm locale={locale} />
            </Reveal>
          </div>

          <Reveal className={styles.mapSection} delay={0.15}>
            <span className={styles.infoLabel}>{t.location}</span>
            <h2 className={styles.mapHeading}>{t.mapHeading}</h2>
            <div className={styles.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.480530398613!2d20.245086576847605!3d43.61735657110383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4757bd51e6de8957%3A0xdee3633a0603ae49!2sIvanjicki%20konaci%20smestaj%20sa%20restoranom!5e0!3m2!1sen!2srs!4v1787617358753!5m2!1sen!2srs"
                title={t.mapTitle}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
