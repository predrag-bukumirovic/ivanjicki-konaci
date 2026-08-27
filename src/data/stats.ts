import type { Locale } from "@/lib/i18n";

const statsByLocale = {
  sr: [
    {
      text: "Smešteni blizu nekih od najlepših prirodnih destinacija u zemlji",
      value: "+80",
    },
    {
      text: "Ugostili smo goste iz celog sveta",
      value: "+100",
    },
    {
      text: "Podržani od strane proverenih partnera u turizmu",
      value: "+30",
    },
    {
      text: "Prostrani konaci pogodni za veće grupe i porodice",
      value: "+50",
    },
  ],
  en: [
    {
      text: "Located near some of the country's most beautiful natural destinations",
      value: "+80",
    },
    {
      text: "Guests welcomed from around the world",
      value: "+100",
    },
    {
      text: "Supported by trusted tourism partners",
      value: "+30",
    },
    {
      text: "Spacious rooms suited for families and larger groups",
      value: "+50",
    },
  ],
} as const;

export function getStats(locale: Locale = "sr") {
  return statsByLocale[locale];
}

export const stats = getStats();
