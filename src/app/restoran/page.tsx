import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IoCallOutline,
  IoCalendarOutline,
  IoMailOutline,
  IoRestaurantOutline,
  IoWaterOutline,
} from "react-icons/io5";
import PageHeader from "@/components/PageHeader/PageHeader";
import Reveal from "@/components/Reveal/Reveal";
import CallToAction from "@/components/CallToAction/CallToAction";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/i18n";
import styles from "./page.module.scss";

const content = {
  sr: {
    metadata: {
      title: "Restoran | Ivanjički Konaci",
      description:
        "Restoran, bazen i organizacija proslava u objektu Ivanjički Konaci u Ivanjici.",
    },
    title: "Restoran",
    subtitle:
      "Restoran, bazen i prostor za rođendane, svadbe i druga okupljanja u mirnom ambijentu Ivanjice.",
    imageAlt: "Doručak sa pogledom u Ivanjičkim konacima",
    label: "Restoran I Sadržaji",
    heading: "Hrana, pogled i prostor za trenutke koji se pamte",
    intro:
      "Ivanjički Konaci pored smeštaja nude restoran, bazen i mogućnost organizacije privatnih i porodičnih događaja. Sve je smešteno u prirodnom okruženju, sa pogledom na ivanjičke predele.",
    highlights: [
      "restoran za goste i posetioce",
      "bazen i terasa za letnje dane",
      "organizacija rođendana, svadbi i proslava",
    ],
    phoneCta: "Pozovite za dogovor",
    emailCta: "Pošaljite upit",
    menuCta: "Pogledaj meni",
    sections: [
      {
        title: "Restoran",
        text: "Domaći ambijent, terasa sa pogledom i izbor jela za goste koji žele kompletan boravak bez žurbe.",
        image:
          "/booking/ivanjicki-konaci/gallery/booking-galerija-10-69631083.jpg",
        alt: "Serviran obrok na terasi restorana",
        icon: "restaurant",
      },
      {
        title: "Bazen",
        text: "Otvoren prostor za opuštanje tokom toplih dana, uz ležaljke, terasu i pogled na prirodu oko kompleksa.",
        image: "/booking/ivanjicki-konaci/gallery/bazen.jpg",
        alt: "Bazen i terasa u Ivanjičkim konacima",
        icon: "pool",
      },
      {
        title: "Organizacija Događaja",
        text: "Prostor je pogodan za rođendane, svadbe i porodična okupljanja, uz dogovor oko termina i detalja.",
        image: "/booking/ivanjicki-konaci/gallery/proslava.jpg",
        alt: "Proslava pored bazena u Ivanjičkim konacima",
        icon: "events",
      },
    ],
    eventLabel: "Proslave I Okupljanja",
    eventHeading: "Za rođendane, svadbe i privatne događaje",
    eventText:
      "Za tačnu ponudu, slobodne termine, kapacitet i dogovor oko hrane najbolje je da se javite direktno telefonom ili emailom.",
  },
  en: {
    metadata: {
      title: "Restaurant | Ivanjicki Konaci",
      description:
        "Restaurant, pool and event organization at Ivanjicki Konaci in Ivanjica.",
    },
    title: "Restaurant",
    subtitle:
      "Restaurant, pool and space for birthdays, weddings and gatherings in the peaceful Ivanjica setting.",
    imageAlt: "Breakfast with a view at Ivanjicki Konaci",
    label: "Restaurant And Amenities",
    heading: "Food, views and space for memorable moments",
    intro:
      "Ivanjicki Konaci offers more than accommodation: guests can enjoy the restaurant, pool and event organization for private and family gatherings. Everything is set in a calm natural environment with views of the Ivanjica landscape.",
    highlights: [
      "restaurant for guests and visitors",
      "pool and terrace for warm days",
      "birthdays, weddings and private celebrations",
    ],
    phoneCta: "Call to arrange",
    emailCta: "Send inquiry",
    menuCta: "View menu",
    sections: [
      {
        title: "Restaurant",
        text: "A warm local atmosphere, terrace views and food options for guests who want a complete, easy stay.",
        image:
          "/booking/ivanjicki-konaci/gallery/booking-galerija-10-69631083.jpg",
        alt: "Served meal on the restaurant terrace",
        icon: "restaurant",
      },
      {
        title: "Pool",
        text: "An open-air place to relax during warm days, with loungers, terrace space and views of the surrounding nature.",
        image:
          "/booking/ivanjicki-konaci/gallery/booking-galerija-09-187168983.jpg",
        alt: "Pool and terrace at Ivanjicki Konaci",
        icon: "pool",
      },
      {
        title: "Event Organization",
        text: "The property is suitable for birthdays, weddings and family gatherings, with details arranged directly.",
        image: "/booking/ivanjicki-konaci/gallery/proslava.jpg",
        alt: "Event setup by the pool at Ivanjicki Konaci",
        icon: "events",
      },
    ],
    eventLabel: "Celebrations And Gatherings",
    eventHeading: "For birthdays, weddings and private events",
    eventText:
      "For the exact offer, available dates, capacity and food arrangements, it is best to contact the property directly by phone or email.",
  },
} as const;

function FeatureIcon({ icon }: { icon: "events" | "pool" | "restaurant" }) {
  if (icon === "pool") {
    return <IoWaterOutline size={22} />;
  }

  if (icon === "events") {
    return <IoCalendarOutline size={22} />;
  }

  return <IoRestaurantOutline size={22} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function RestoranPage() {
  const locale: Locale = await getLocale();
  const t = content[locale];

  return (
    <main>
      <PageHeader title={t.title} subtitle={t.subtitle} locale={locale} />

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <Reveal>
              <div className={styles.imageWrap}>
                <Image
                  src="/booking/ivanjicki-konaci/gallery/booking-galerija-10-69631083.jpg"
                  alt={t.imageAlt}
                  fill
                  priority
                  className={styles.image}
                  sizes="(max-width: 900px) 100vw, 52vw"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1} className={styles.copyBlock}>
              <span className={styles.label}>{t.label}</span>
              <h2 className={styles.heading}>{t.heading}</h2>
              <p className={styles.text}>{t.intro}</p>

              <ul className={styles.highlights}>
                {t.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className={styles.actions}>
                <Link href="/meni" className={styles.primaryCta}>
                  <IoRestaurantOutline size={18} />
                  {t.menuCta}
                </Link>
                <a href="tel:+381606130776" className={styles.secondaryCta}>
                  <IoCallOutline size={18} />
                  {t.phoneCta}
                </a>
                <a
                  href="mailto:ivanjicki.konaci@gmail.com"
                  className={styles.secondaryCta}
                >
                  <IoMailOutline size={18} />
                  {t.emailCta}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            {t.sections.map((section, index) => (
              <Reveal
                className={styles.featureCard}
                delay={index * 0.08}
                key={section.title}
              >
                <div className={styles.cardImageWrap}>
                  <Image
                    src={section.image}
                    alt={section.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.iconWrap}>
                    <FeatureIcon icon={section.icon} />
                  </span>
                  <h3 className={styles.cardTitle}>{section.title}</h3>
                  <p className={styles.cardText}>{section.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.eventSection}>
        <div className={styles.container}>
          <Reveal className={styles.eventBand}>
            <div>
              <span className={styles.eventLabel}>{t.eventLabel}</span>
              <h2 className={styles.eventHeading}>{t.eventHeading}</h2>
            </div>
            <p className={styles.eventText}>{t.eventText}</p>
            <Link href="/kontakt" className={styles.eventCta}>
              {locale === "sr" ? "Kontakt" : "Contact"}
            </Link>
          </Reveal>
        </div>
      </section>

      <CallToAction locale={locale} />
    </main>
  );
}
