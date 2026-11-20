import type { Locale } from "@/lib/i18n";

/** Contact details and links used across the site — change them here only. */
export const site = {
  phone: "+381 60 6130776",
  phoneHref: "tel:+381606130776",
  email: "ivanjicki.konaci@gmail.com",
  bookingUrl:
    "https://www.booking.com/hotel/rs/apartments-ivanjicki-konaci.sr.html",
  instagram: "https://www.instagram.com/ivanjicki.konaci/",
  facebook: "https://www.facebook.com/ivanjickikonaci1",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Ivanjicki+konaci+smestaj+sa+restoranom",
  address: {
    sr: "Kneza Miloša bb, Ivanjica, Srbija",
    en: "Kneza Milosa bb, Ivanjica, Serbia",
  } satisfies Record<Locale, string>,
};

/** "do 2 gosta" / "do 5 gostiju" / "up to 3 guests". */
export function guestsLabel(count: number, locale: Locale) {
  if (locale === "en") return `up to ${count} guests`;
  const lastTwo = count % 100;
  const last = count % 10;
  const few = last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14);
  return `do ${count} ${few ? "gosta" : "gostiju"}`;
}
