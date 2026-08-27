export const locales = ["sr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sr";

export function normalizeLocale(value: string | null | undefined): Locale {
  return value === "en" ? "en" : "sr";
}

export const commonCopy = {
  sr: {
    home: "Početna",
    rooms: "Konaci",
    restaurant: "Restoran",
    menu: "Meni",
    gallery: "Galerija",
    about: "O Nama",
    contact: "Kontakt",
    bookNow: "Rezerviši Sada",
    checkAvailability: "Proveri dostupnost",
  },
  en: {
    home: "Home",
    rooms: "Rooms",
    restaurant: "Restaurant",
    menu: "Menu",
    gallery: "Gallery",
    about: "About",
    contact: "Contact",
    bookNow: "Book Now",
    checkAvailability: "Check Availability",
  },
} as const;
