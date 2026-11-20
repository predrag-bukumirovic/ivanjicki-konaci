import type { Metadata } from "next";
import BookingBand from "@/components/BookingBand/BookingBand";
import PageHeader from "@/components/PageHeader/PageHeader";
import RoomPhotos from "@/components/RoomPhotos/RoomPhotos";
import { getCabins, type Cabin } from "@/data/cabins";
import { getLocale } from "@/lib/server-locale";
import { guestsLabel, site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import styles from "./page.module.scss";

const content = {
  sr: {
    metadata: {
      title: "Smeštaj | Ivanjički konaci",
      description:
        "Šest tipova soba u Ivanjičkim konacima, od 25 do 42 m², za 2 do 5 gostiju — sa fotografijama, krevetima i sadržajima.",
    },
    kicker: "Smeštaj",
    title: "Sobe",
    lede: "Šest tipova soba, od dvokrevetnih do porodične sobe za pet osoba. Sve imaju sopstveno kupatilo, klimu i pogled na planinu.",
    beds: "Kreveti",
    views: "Pogled na",
    inRoom: "U sobi",
    book: "Proveri dostupnost",
    call: "Pozovite",
  },
  en: {
    metadata: {
      title: "Rooms | Ivanjicki Konaci",
      description:
        "Six room types at Ivanjicki Konaci, 25–42 m², for 2 to 5 guests — with photos, beds and amenities.",
    },
    kicker: "Rooms",
    title: "Rooms",
    lede: "Six room types, from doubles to a family room for five. All have a private bathroom, air conditioning and a mountain view.",
    beds: "Beds",
    views: "Views",
    inRoom: "In the room",
    book: "Check availability",
    call: "Call",
  },
} as const;

/** Splits facilities into views ("pogled na vrt" → "vrt") and everything else. */
function splitFacilities(facilities: string[], locale: Locale) {
  const views: string[] = [];
  const other: string[] = [];
  for (const facility of facilities) {
    const view =
      locale === "sr"
        ? facility.match(/^pogled na (.+)$/i)?.[1]
        : facility.match(/^(.+) view$/i)?.[1];
    if (view) views.push(view);
    else other.push(facility);
  }
  return { views, other };
}

function RoomDetails({
  room,
  index,
  locale,
}: {
  room: Cabin;
  index: number;
  locale: Locale;
}) {
  const t = content[locale];
  const { views, other } = splitFacilities(room.facilities, locale);

  return (
    <article className={styles.room} id={room.slug} aria-labelledby={`${room.slug}-title`}>
      <RoomPhotos
        images={room.images.length > 0 ? room.images : [room.image]}
        name={room.name}
        locale={locale}
        priority={index === 0}
      />

      <div className={styles.body}>
        <h2 className={styles.name} id={`${room.slug}-title`}>
          {room.name}
        </h2>
        <p className={styles.meta}>
          {room.size} · {guestsLabel(room.maxOccupancy, locale)}
        </p>

        <dl className={styles.specs}>
          <div>
            <dt>{t.beds}</dt>
            <dd>{room.beds.join(", ")}</dd>
          </div>
          {views.length > 0 && (
            <div>
              <dt>{t.views}</dt>
              <dd>{views.join(", ")}</dd>
            </div>
          )}
          <div>
            <dt>{t.inRoom}</dt>
            <dd>{other.join(", ")}</dd>
          </div>
        </dl>

        <div className={styles.actions}>
          <a
            href={room.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-dark"
          >
            {t.book}
          </a>
          <a href={site.phoneHref} className="button button-light">
            {t.call}
          </a>
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function KonaciPage() {
  const locale = await getLocale();
  const rooms = getCabins(locale);
  const t = content[locale];

  return (
    <main>
      <PageHeader kicker={t.kicker} title={t.title} lede={t.lede} />

      <section className={styles.section}>
        <div className={`container ${styles.list}`}>
          {rooms.map((room, index) => (
            <RoomDetails room={room} index={index} locale={locale} key={room.slug} />
          ))}
        </div>
      </section>

      <BookingBand locale={locale} />
    </main>
  );
}
