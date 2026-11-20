import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookingBand from "@/components/BookingBand/BookingBand";
import PageHeader from "@/components/PageHeader/PageHeader";
import Reviews from "@/components/Reviews/Reviews";
import SectionHead from "@/components/SectionHead/SectionHead";
import { getLocale } from "@/lib/server-locale";
import styles from "./page.module.scss";

const gallery = "/booking/ivanjicki-konaci/gallery";

const content = {
  sr: {
    metadata: {
      title: "O nama | Ivanjički konaci",
      description:
        "Ivanjički konaci — smeštaj sa restoranom i bazenom na mirnoj padini nadomak Ivanjice.",
    },
    kicker: "O nama",
    title: "Mesto za pravi predah",
    lede: "Smeštaj, restoran i bazen na mirnoj padini nadomak Ivanjice, okruženi voćnjacima i brdima.",
    imageAlt: "Pogled iz vazduha na Ivanjičke konake i okolna brda",
    story: [
      "Ivanjički konaci su nastali iz želje da gostima ponudimo nešto drugačije od standardnog smeštaja: mesto gde se odmara uz pogled, tišinu i dobru hranu, a da se ne odriče udobnosti.",
      "Na imanju je šest tipova soba, restoran sa domaćom kuhinjom, otvoreni bazen i dečije igralište. Dolaze nam porodice, parovi i društva na proputovanju kroz zapadnu Srbiju, a neki nam se i vraćaju.",
      "Pored smeštaja organizujemo rođendane, svadbe i porodična okupljanja — u restoranu ili uz bazen.",
    ],
    links: [
      { href: "/konaci", label: "Sobe" },
      { href: "/restoran", label: "Restoran i bazen" },
      { href: "/galerija", label: "Galerija" },
    ],
    reviewsTitle: "Utisci gostiju",
    reviewsLede: "Izbor utisaka gostiju sa Booking.com.",
  },
  en: {
    metadata: {
      title: "About | Ivanjicki Konaci",
      description:
        "Ivanjicki Konaci — rooms, a restaurant and a pool on a quiet hillside just outside Ivanjica.",
    },
    kicker: "About",
    title: "A place for a real break",
    lede: "Rooms, a restaurant and a pool on a quiet hillside just outside Ivanjica, surrounded by orchards and hills.",
    imageAlt: "Aerial view of Ivanjicki Konaci and the surrounding hills",
    story: [
      "Ivanjicki Konaci grew out of a wish to offer something different from standard accommodation: a place to rest with a view, quiet and good food, without giving up comfort.",
      "The property has six room types, a restaurant with home cooking, an outdoor pool and a children's playground. Our guests include families, couples and groups travelling through western Serbia — and some keep coming back.",
      "Besides accommodation, we host birthdays, weddings and family gatherings — in the restaurant or by the pool.",
    ],
    links: [
      { href: "/konaci", label: "Rooms" },
      { href: "/restoran", label: "Restaurant and pool" },
      { href: "/galerija", label: "Gallery" },
    ],
    reviewsTitle: "Guest reviews",
    reviewsLede: "A selection of guest reviews from Booking.com.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function ONamaPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <main>
      <PageHeader kicker={t.kicker} title={t.title} lede={t.lede} />

      <section className={styles.story}>
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.image}>
            <Image
              src={`${gallery}/booking-galerija-07-416006954.jpg`}
              alt={t.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
              className={styles.cover}
            />
          </div>

          <div className={styles.text}>
            {t.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className={styles.links}>
              {t.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.reviews} id="utisci">
        <div className="container">
          <SectionHead title={t.reviewsTitle}>{t.reviewsLede}</SectionHead>
          <Reviews locale={locale} />
        </div>
      </section>

      <BookingBand locale={locale} />
    </main>
  );
}
