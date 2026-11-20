import Image from "next/image";
import Link from "next/link";
import BookingBand from "@/components/BookingBand/BookingBand";
import Reviews from "@/components/Reviews/Reviews";
import SectionHead from "@/components/SectionHead/SectionHead";
import { getCabins } from "@/data/cabins";
import { getLocale } from "@/lib/server-locale";
import { guestsLabel } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import styles from "./page.module.scss";

const gallery = "/booking/ivanjicki-konaci/gallery";

const copy = {
  sr: {
    kicker: "Ivanjica, zapadna Srbija",
    title: "Smeštaj sa restoranom i bazenom, nadomak Ivanjice.",
    lede: "Sobe sa pogledom na brda, domaća kuhinja i mir van grada. Za odmor, porodični vikend ili proslavu.",
    primary: "Rezerviši",
    secondary: "Pogledaj sobe",
    heroAlt: "Ivanjički konaci noću, okruženi brdima",
    facts: {
      rooms: "tipova soba",
      size: "veličina sobe",
      guests: "gostiju u sobi",
      breakfast: "doručak",
    },
    placeTitle: "Mesto",
    placeText:
      "Imanje je na mirnoj padini nadomak Ivanjice, okruženo voćnjacima i brdima. Gosti u utiscima najčešće pominju tri stvari: pogled, tišinu i hranu.",
    placeLink: "O nama",
    placeAlt: "Terasa i bazen sa pogledom na ivanjička brda",
    roomsTitle: "Sobe",
    roomsLink: "Sve sobe",
    restaurantTitle: "Restoran",
    restaurantText:
      "Domaća kuhinja u drvenom ambijentu sa kaminom i terasa sa pogledom. Doručak se služi od 08 do 12 h, a na meniju su roštilj, jela po porudžbini, sveža pastrmka sa Slatine i domaća vina. Restoran je otvoren i za goste van smeštaja.",
    restaurantAlt: "Unutrašnjost restorana sa drvenim plafonom",
    menuLink: "Pogledaj meni",
    restaurantLink: "Više o restoranu",
    poolTitle: "Bazen",
    poolText:
      "Otvoreni bazen sa ležaljkama i pogledom na okolna brda, a na imanju je i dečije igralište. Prostor oko bazena koristi se i za rođendane, svadbe i porodična okupljanja.",
    poolAlt: "Bazen u sumrak sa pogledom na planine",
    poolLink: "Bazen i proslave",
    reviewsTitle: "Utisci gostiju",
    reviewsLink: "Svi utisci",
  },
  en: {
    kicker: "Ivanjica, western Serbia",
    title: "Rooms, a restaurant and a pool, just outside Ivanjica.",
    lede: "Rooms with views of the hills, home cooking and quiet away from town. For a break, a family weekend or a celebration.",
    primary: "Book",
    secondary: "See the rooms",
    heroAlt: "Ivanjicki Konaci at night, surrounded by hills",
    facts: {
      rooms: "room types",
      size: "room size",
      guests: "guests per room",
      breakfast: "breakfast",
    },
    placeTitle: "The place",
    placeText:
      "The property sits on a quiet hillside just outside Ivanjica, surrounded by orchards and hills. In their reviews, guests mention three things most: the view, the quiet and the food.",
    placeLink: "About us",
    placeAlt: "Terrace and pool overlooking the Ivanjica hills",
    roomsTitle: "Rooms",
    roomsLink: "All rooms",
    restaurantTitle: "Restaurant",
    restaurantText:
      "Home cooking in a wooden dining room with a fireplace, plus a terrace with a view. Breakfast is served 08:00–12:00, and the menu has grilled meats, dishes to order, fresh trout from Slatina and local wines. The restaurant is open to visitors too.",
    restaurantAlt: "Restaurant interior with a wooden ceiling",
    menuLink: "See the menu",
    restaurantLink: "More about the restaurant",
    poolTitle: "Pool",
    poolText:
      "An outdoor pool with loungers and views of the surrounding hills, plus a children's playground on the grounds. The area around the pool is also used for birthdays, weddings and family gatherings.",
    poolAlt: "Pool at dusk with mountains in the background",
    poolLink: "Pool and events",
    reviewsTitle: "Guest reviews",
    reviewsLink: "All reviews",
  },
} as const;

function roomFacts(locale: Locale) {
  const rooms = getCabins(locale);
  const sizes = rooms.map((room) => room.sizeM2);
  return {
    count: rooms.length,
    minSize: Math.min(...sizes),
    maxSize: Math.max(...sizes),
    maxGuests: Math.max(...rooms.map((room) => room.maxOccupancy)),
  };
}

export default async function Home() {
  const locale = await getLocale();
  const t = copy[locale];
  const rooms = getCabins(locale);
  const facts = roomFacts(locale);

  return (
    <main>
      {/* ---------------------------------------------------------- Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroText}`}>
          <p className={styles.kicker}>{t.kicker}</p>
          <h1 className={styles.title}>{t.title}</h1>
          <div className={styles.heroAside}>
            <p className={styles.lede}>{t.lede}</p>
            <div className={styles.actions}>
              <Link href="/kontakt" className="button button-dark">
                {t.primary}
              </Link>
              <Link href="/konaci" className="button button-light">
                {t.secondary}
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.heroImage}>
            <Image
              src="/img/naslovna.png"
              alt={t.heroAlt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className={styles.cover}
            />
          </div>

          <dl className={styles.facts}>
            <div>
              <dd>{facts.count}</dd>
              <dt>{t.facts.rooms}</dt>
            </div>
            <div>
              <dd>
                {facts.minSize}–{facts.maxSize} m²
              </dd>
              <dt>{t.facts.size}</dt>
            </div>
            <div>
              <dd>{locale === "sr" ? `do ${facts.maxGuests}` : `up to ${facts.maxGuests}`}</dd>
              <dt>{t.facts.guests}</dt>
            </div>
            <div>
              <dd>08–12 h</dd>
              <dt>{t.facts.breakfast}</dt>
            </div>
          </dl>
        </div>
      </section>

      {/* --------------------------------------------------------- Place */}
      <section className={styles.section}>
        <div className={`container ${styles.place}`}>
          <div className={styles.placeText}>
            <h2 className={styles.eyebrowTitle}>{t.placeTitle}</h2>
            <p className={styles.statement}>{t.placeText}</p>
            <Link href="/o-nama" className="text-link">
              {t.placeLink}
            </Link>
          </div>
          <div className={styles.placeImage}>
            <Image
              src={`${gallery}/booking-galerija-14-69631186.jpg`}
              alt={t.placeAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.cover}
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Rooms */}
      <section className={styles.section}>
        <div className="container">
          <SectionHead
            title={t.roomsTitle}
            link={{ href: "/konaci", label: `${t.roomsLink} (${rooms.length})` }}
          />
        </div>
        <ul className={`container ${styles.roomRow}`}>
          {rooms.slice(0, 3).map((room) => (
            <li key={room.slug}>
              <Link href={`/konaci#${room.slug}`} className={styles.roomCard}>
                <div className={styles.roomImage}>
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1000px) 45vw, 380px"
                    className={styles.cover}
                  />
                </div>
                <h3 className={styles.roomName}>{room.name}</h3>
                <p className={styles.roomMeta}>
                  {room.size} · {guestsLabel(room.maxOccupancy, locale)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ----------------------------------------- Restaurant & pool rows */}
      <section className={styles.section}>
        <div className={`container ${styles.rows}`}>
          <article className={styles.row}>
            <div className={styles.rowImage}>
              <Image
                src={`${gallery}/booking-galerija-05-416006092.jpg`}
                alt={t.restaurantAlt}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                className={styles.cover}
              />
            </div>
            <div className={styles.rowText}>
              <h2 className={styles.rowTitle}>{t.restaurantTitle}</h2>
              <p>{t.restaurantText}</p>
              <div className={styles.rowLinks}>
                <Link href="/meni" className="button button-dark">
                  {t.menuLink}
                </Link>
                <Link href="/restoran" className="text-link">
                  {t.restaurantLink}
                </Link>
              </div>
            </div>
          </article>

          <article className={`${styles.row} ${styles.rowFlip}`}>
            <div className={styles.rowImage}>
              <Image
                src={`${gallery}/booking-galerija-04-35124405.jpg`}
                alt={t.poolAlt}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                className={styles.cover}
              />
            </div>
            <div className={styles.rowText}>
              <h2 className={styles.rowTitle}>{t.poolTitle}</h2>
              <p>{t.poolText}</p>
              <div className={styles.rowLinks}>
                <Link href="/restoran#bazen" className="text-link">
                  {t.poolLink}
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ------------------------------------------------------- Reviews */}
      <section className={`${styles.section} ${styles.sectionEnd}`}>
        <div className="container">
          <SectionHead
            title={t.reviewsTitle}
            link={{ href: "/o-nama#utisci", label: t.reviewsLink }}
          />
          <Reviews locale={locale} limit={3} />
        </div>
      </section>

      <BookingBand locale={locale} />
    </main>
  );
}
