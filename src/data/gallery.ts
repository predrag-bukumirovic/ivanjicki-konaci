import type { Locale } from "@/lib/i18n";

/**
 * Photos on the /galerija page — the files in public/img/nove-slike.
 * Width and height are the display size after EXIF rotation, so the masonry
 * grid can reserve the right space before each photo loads.
 * To add a photo: put the file in that folder and add an entry here.
 */
const base = "/img/nove-slike";

const photos: {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
}[] = [
  {
    src: `${base}/image00001.jpeg`,
    width: 1440,
    height: 1440,
    alt: { sr: "Popločana staza kroz voćnjak", en: "Paved path through the orchard" },
  },
  {
    src: `${base}/image00002.jpeg`,
    width: 1440,
    height: 1439,
    alt: { sr: "Voće i posluženje pored bazena", en: "Fruit and refreshments by the pool" },
  },
  {
    src: `${base}/image00003.jpeg`,
    width: 3024,
    height: 4032,
    alt: { sr: "Bazen sa okruglim delom za sedenje u vodi", en: "Pool with a round seating area in the water" },
  },
  {
    src: `${base}/image00004.jpeg`,
    width: 1290,
    height: 2293,
    alt: { sr: "Postavljen sto sa hranom", en: "A table set with food" },
  },
  {
    src: `${base}/image00005.jpeg`,
    width: 1200,
    height: 1600,
    alt: { sr: "Bazen i terasa restorana", en: "Pool and restaurant terrace" },
  },
  {
    src: `${base}/image00006.jpeg`,
    width: 3024,
    height: 4032,
    alt: { sr: "Dvorište sa osvetljenjem u sumrak", en: "The garden lit up at dusk" },
  },
  {
    src: `${base}/image00007.jpeg`,
    width: 3024,
    height: 4032,
    alt: { sr: "Staza sa pogledom na brda", en: "Path with a view of the hills" },
  },
  {
    src: `${base}/image00008.jpeg`,
    width: 3024,
    height: 4032,
    alt: { sr: "Pogled na brda i dečije igralište", en: "View of the hills and the playground" },
  },
  {
    src: `${base}/image00009.jpeg`,
    width: 3024,
    height: 4032,
    alt: { sr: "Bazen i zgrade smeštaja", en: "Pool and the guest buildings" },
  },
  {
    src: `${base}/image00010.jpeg`,
    width: 3024,
    height: 4032,
    alt: { sr: "Natkriveno kameno stepenište", en: "Covered stone staircase" },
  },
  {
    src: `${base}/image00011.jpeg`,
    width: 3648,
    height: 5472,
    alt: { sr: "Bazen okružen drvećem", en: "Pool surrounded by trees" },
  },
  {
    src: `${base}/image00012.jpeg`,
    width: 3648,
    height: 5472,
    alt: { sr: "Staza između voćaka", en: "Path between fruit trees" },
  },
  {
    src: `${base}/image00013.jpeg`,
    width: 3648,
    height: 5472,
    alt: { sr: "Voda u bazenu", en: "Pool water up close" },
  },
  {
    src: `${base}/image00014.jpeg`,
    width: 3024,
    height: 4032,
    alt: { sr: "Bazen sa okruglim delom za sedenje", en: "Pool with its round seating area" },
  },
  {
    src: `${base}/image00015.jpeg`,
    width: 3024,
    height: 4032,
    alt: { sr: "Pogled sa imanja na brda", en: "View of the hills from the grounds" },
  },
  {
    src: `${base}/image00016.jpeg`,
    width: 3024,
    height: 4032,
    alt: { sr: "Bazen sa pogledom na brda", en: "Pool overlooking the hills" },
  },
  {
    src: `${base}/image00017.jpeg`,
    width: 3648,
    height: 5472,
    alt: { sr: "Osvetljen bazen noću", en: "The pool lit up at night" },
  },
  {
    src: `${base}/image00018.jpeg`,
    width: 3648,
    height: 5472,
    alt: { sr: "Bazen i terasa noću", en: "Pool and terrace at night" },
  },
  {
    src: `${base}/image00019.jpeg`,
    width: 1290,
    height: 2280,
    alt: { sr: "Doručak na terasi", en: "Breakfast on the terrace" },
  },
  {
    src: `${base}/image00020.jpeg`,
    width: 1290,
    height: 2259,
    alt: { sr: "Jela sa roštilja i pečene paprike", en: "Grilled dishes and roasted peppers" },
  },
  {
    src: `${base}/image00021.jpeg`,
    width: 1290,
    height: 2290,
    alt: { sr: "Posluženje za proslavu", en: "Food served for a celebration" },
  },
  {
    src: `${base}/image00022.jpeg`,
    width: 1290,
    height: 1618,
    alt: { sr: "Pršuta i sir", en: "Prosciutto and cheese" },
  },
  {
    src: `${base}/image00023.jpeg`,
    width: 3024,
    height: 4032,
    alt: { sr: "Terasa sa stolom i stolicama", en: "Terrace with a table and chairs" },
  },
  {
    src: `${base}/image00024.jpeg`,
    width: 4284,
    height: 5712,
    alt: { sr: "Bazen i voće na ivici bazena", en: "Pool with fruit on its edge" },
  },
];

export function getGalleryImages(locale: Locale = "sr") {
  return photos.map((photo) => ({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.alt[locale],
  }));
}
