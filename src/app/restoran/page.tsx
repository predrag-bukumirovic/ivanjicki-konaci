import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookingBand from "@/components/BookingBand/BookingBand";
import PageHeader from "@/components/PageHeader/PageHeader";
import { getLocale } from "@/lib/server-locale";
import { site } from "@/lib/site";
import styles from "./page.module.scss";

const gallery = "/booking/ivanjicki-konaci/gallery";

const content = {
  sr: {
    metadata: {
      title: "Restoran i bazen | Ivanjički konaci",
      description:
        "Restoran sa domaćom kuhinjom, bazen sa pogledom i prostor za proslave u Ivanjičkim konacima, nadomak Ivanjice.",
    },
    kicker: "Restoran i sadržaji",
    title: "Restoran",
    lede: "Domaća kuhinja, terasa sa pogledom i bazen. Restoran je otvoren i za goste koji nisu u smeštaju.",
    menuCta: "Pogledaj meni",
    heroAlt: "Doručak na terasi sa pogledom na brda",
    sections: [
      {
        id: "kuhinja",
        title: "Kuhinja",
        text: "Doručak se služi od 08 do 12 h. Za ručak i večeru tu su čorbe, roštilj, jela po porudžbini, sveža pastrmka sa Slatine i domaći deserti, a uz to domaća i strana vina, rakije i točeno pivo.",
        image: `${gallery}/booking-galerija-34-423346811.jpg`,
        alt: "Daska sa pršutom i sirom i sveža salata",
        link: { href: "/meni", label: "Ceo meni sa cenama" },
      },
      {
        id: "bazen",
        title: "Bazen",
        text: "Otvoreni bazen sa ležaljkama, suncobranima i pogledom na brda oko Ivanjice. Na imanju je i dečije igralište, pa je mesto pogodno i za porodice sa decom.",
        image: `${gallery}/booking-galerija-09-187168983.jpg`,
        alt: "Bazen sa suncobranima i pogledom na zelena brda",
        link: null,
      },
      {
        id: "proslave",
        title: "Proslave",
        text: "Rođendani, svadbe i porodična okupljanja — u restoranu ili uz bazen. Termin, broj gostiju i meni dogovaramo direktno, telefonom ili emailom.",
        image: `${gallery}/proslava.jpg`,
        alt: "Postavljeni stolovi za proslavu pored bazena",
        link: { href: "/kontakt", label: "Pošaljite upit" },
      },
    ],
    photosTitle: "Iz restorana",
    photos: [
      { src: `${gallery}/booking-galerija-16-41960977.jpg`, alt: "Sala restorana sa drvenim stolovima" },
      { src: `${gallery}/booking-galerija-12-187165353.jpg`, alt: "Restoran sa kaminom" },
      { src: `${gallery}/booking-galerija-40-423359940.jpg`, alt: "Gosti na terasi sa pogledom" },
      { src: `${gallery}/booking-galerija-15-69630816.jpg`, alt: "Piće na terasi iznad doline" },
    ],
  },
  en: {
    metadata: {
      title: "Restaurant and pool | Ivanjicki Konaci",
      description:
        "A restaurant with home cooking, a pool with a view and space for celebrations at Ivanjicki Konaci, just outside Ivanjica.",
    },
    kicker: "Restaurant and amenities",
    title: "Restaurant",
    lede: "Home cooking, a terrace with a view and a pool. The restaurant is open to visitors who are not staying with us, too.",
    menuCta: "See the menu",
    heroAlt: "Breakfast on the terrace overlooking the hills",
    sections: [
      {
        id: "kuhinja",
        title: "Kitchen",
        text: "Breakfast is served 08:00–12:00. For lunch and dinner there are soups, grilled meats, dishes to order, fresh trout from Slatina and homemade desserts — plus local and international wines, rakija and draft beer.",
        image: `${gallery}/booking-galerija-34-423346811.jpg`,
        alt: "Board with prosciutto and cheese and a fresh salad",
        link: { href: "/meni", label: "Full menu with prices" },
      },
      {
        id: "bazen",
        title: "Pool",
        text: "An outdoor pool with loungers, parasols and views of the hills around Ivanjica. There is also a children's playground on the grounds, so it works well for families.",
        image: `${gallery}/booking-galerija-09-187168983.jpg`,
        alt: "Pool with parasols overlooking green hills",
        link: null,
      },
      {
        id: "proslave",
        title: "Celebrations",
        text: "Birthdays, weddings and family gatherings — in the restaurant or by the pool. Dates, number of guests and menu are arranged directly, by phone or email.",
        image: `${gallery}/proslava.jpg`,
        alt: "Tables set for a celebration by the pool",
        link: { href: "/kontakt", label: "Send an inquiry" },
      },
    ],
    photosTitle: "From the restaurant",
    photos: [
      { src: `${gallery}/booking-galerija-16-41960977.jpg`, alt: "Dining room with wooden tables" },
      { src: `${gallery}/booking-galerija-12-187165353.jpg`, alt: "Restaurant with a fireplace" },
      { src: `${gallery}/booking-galerija-40-423359940.jpg`, alt: "Guests on the terrace with a view" },
      { src: `${gallery}/booking-galerija-15-69630816.jpg`, alt: "A drink on the terrace above the valley" },
    ],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function RestoranPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <main>
      <PageHeader kicker={t.kicker} title={t.title} lede={t.lede}>
        <Link href="/meni" className="button button-dark">
          {t.menuCta}
        </Link>
        <a href={site.phoneHref} className="text-link">
          {site.phone}
        </a>
      </PageHeader>

      <div className="container">
        <div className={styles.heroImage}>
          <Image
            src={`${gallery}/booking-galerija-10-69631083.jpg`}
            alt={t.heroAlt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className={styles.cover}
          />
        </div>
      </div>

      <section className={styles.sections}>
        <div className={`container ${styles.rows}`}>
          {t.sections.map((section, index) => (
            <article
              className={`${styles.row} ${index % 2 === 1 ? styles.rowFlip : ""}`}
              id={section.id}
              key={section.id}
            >
              <div className={styles.rowImage}>
                <Image
                  src={section.image}
                  alt={section.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                  className={styles.cover}
                />
              </div>
              <div className={styles.rowText}>
                <h2 className={styles.rowTitle}>{section.title}</h2>
                <p>{section.text}</p>
                {section.link && (
                  <Link href={section.link.href} className="text-link">
                    {section.link.label}
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.photosSection} aria-labelledby="restaurant-photos">
        <div className="container">
          <h2 className={styles.photosTitle} id="restaurant-photos">
            {t.photosTitle}
          </h2>
          <ul className={styles.photos}>
            {t.photos.map((photo) => (
              <li key={photo.src}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 760px) 50vw, 25vw"
                  className={styles.cover}
                />
              </li>
            ))}
          </ul>
          <Link href="/galerija" className="text-link">
            {locale === "sr" ? "Sve fotografije" : "All photos"}
          </Link>
        </div>
      </section>

      <BookingBand locale={locale} />
    </main>
  );
}
