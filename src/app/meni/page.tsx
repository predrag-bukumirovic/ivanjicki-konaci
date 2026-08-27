import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IoCallOutline,
  IoMailOutline,
  IoQrCodeOutline,
  IoRestaurantOutline,
} from "react-icons/io5";
import PageHeader from "@/components/PageHeader/PageHeader";
import Reveal from "@/components/Reveal/Reveal";
import { getMenu } from "@/data/menu";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/i18n";
import MenuExplorer from "./MenuExplorer";
import styles from "./page.module.scss";

const pageCopy = {
  sr: {
    metadata: {
      title: "Digitalni Meni | Ivanjički Konaci",
      description:
        "Digitalni meni restorana Ivanjički Konaci sa doručkom, jelima, pićima i ponudom za proslave.",
    },
    title: "Digitalni Meni",
    subtitle:
      "Pregled restoranske ponude za goste, posetioce i organizaciju proslava.",
    imageAlt: "Jelo iz restorana Ivanjički Konaci",
    label: "Restoran Ivanjički Konaci",
    heading: "Meni za boravak, ručak i proslave",
    intro:
      "Ponuda je organizovana po kategorijama da gosti mogu brzo da pogledaju šta restoran priprema za boravak, dnevni obrok ili privatni događaj.",
    qrLabel: "QR link",
    qrUrl: "ivanjickikonaci.rs/meni",
    callCta: "Pozovi restoran",
    emailCta: "Pošalji upit",
    restaurantCta: "Restoran",
    allLabel: "Sve",
    groupNavLabel: "Tip menija",
    groupLabels: {
      food: "Hrana",
      drinks: "Karta pića",
    },
    navLabel: "Kategorije menija",
    priceLabel: "Cena",
    badgeLabels: {
      event: "proslave",
      guest: "za goste",
      house: "domaće",
      kids: "za decu",
      popular: "traženo",
      seasonal: "sezonski",
      vegetarian: "vegetarijansko",
    },
  },
  en: {
    metadata: {
      title: "Digital Menu | Ivanjicki Konaci",
      description:
        "Digital restaurant menu for Ivanjicki Konaci with breakfast, dishes, drinks and event menus.",
    },
    title: "Digital Menu",
    subtitle:
      "Restaurant offer overview for guests, visitors and private event organization.",
    imageAlt: "Dish from the Ivanjicki Konaci restaurant",
    label: "Ivanjicki Konaci Restaurant",
    heading: "Menu for stays, lunch and celebrations",
    intro:
      "The offer is organized by category so guests can quickly review what the restaurant prepares for a stay, daily meal or private event.",
    qrLabel: "QR link",
    qrUrl: "ivanjickikonaci.rs/meni",
    callCta: "Call restaurant",
    emailCta: "Send inquiry",
    restaurantCta: "Restaurant",
    allLabel: "All",
    groupNavLabel: "Menu type",
    groupLabels: {
      food: "Food",
      drinks: "Drinks menu",
    },
    navLabel: "Menu categories",
    priceLabel: "Price",
    badgeLabels: {
      event: "events",
      guest: "for guests",
      house: "house",
      kids: "kids",
      popular: "popular",
      seasonal: "seasonal",
      vegetarian: "vegetarian",
    },
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageCopy[locale].metadata;
}

export default async function MeniPage() {
  const locale: Locale = await getLocale();
  const t = pageCopy[locale];
  const menu = getMenu(locale);

  return (
    <main>
      <PageHeader title={t.title} subtitle={t.subtitle} locale={locale} />

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <Reveal className={styles.copy}>
              <span className={styles.label}>{t.label}</span>
              <h2 className={styles.heading}>{t.heading}</h2>
              <p className={styles.intro}>{t.intro}</p>

              <div className={styles.actions}>
                <a href="tel:+381606130776" className={styles.primaryCta}>
                  <IoCallOutline size={18} />
                  {t.callCta}
                </a>
                <a
                  href="mailto:ivanjicki.konaci@gmail.com"
                  className={styles.secondaryCta}
                >
                  <IoMailOutline size={18} />
                  {t.emailCta}
                </a>
                <Link href="/restoran" className={styles.secondaryCta}>
                  <IoRestaurantOutline size={18} />
                  {t.restaurantCta}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1} className={styles.visualPanel}>
              <div className={styles.imageWrap}>
                <Image
                  src="/booking/ivanjicki-konaci/gallery/booking-galerija-34-423346811.jpg"
                  alt={t.imageAlt}
                  fill
                  priority
                  className={styles.image}
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </div>
              <div className={styles.qrPanel}>
                <span className={styles.qrIcon}>
                  <IoQrCodeOutline size={22} />
                </span>
                <div>
                  <span className={styles.qrLabel}>{t.qrLabel}</span>
                  <strong>{t.qrUrl}</strong>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.menuSection}>
        <div className={styles.container}>
          <MenuExplorer
            categories={menu.categories}
            labels={{
              allLabel: t.allLabel,
              groupLabels: t.groupLabels,
              groupNavLabel: t.groupNavLabel,
              navLabel: t.navLabel,
              priceLabel: t.priceLabel,
              badgeLabels: t.badgeLabels,
            }}
          />
        </div>
      </section>
    </main>
  );
}
