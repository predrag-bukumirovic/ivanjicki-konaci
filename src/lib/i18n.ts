export const locales = ["sr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sr";

export function normalizeLocale(value: string | null | undefined): Locale {
  return value === "en" ? "en" : "sr";
}

export const commonCopy = {
  sr: {
    home: "Početna",
    rooms: "Smeštaj",
    restaurant: "Restoran",
    menu: "Meni",
    gallery: "Galerija",
    about: "O nama",
    contact: "Kontakt",
    bookNow: "Rezerviši",
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
    bookNow: "Book",
    checkAvailability: "Check availability",
  },
} as const;

export const navLinks = [
  { key: "rooms", href: "/konaci" },
  { key: "restaurant", href: "/restoran" },
  { key: "menu", href: "/meni" },
  { key: "gallery", href: "/galerija" },
  { key: "about", href: "/o-nama" },
  { key: "contact", href: "/kontakt" },
] as const;
