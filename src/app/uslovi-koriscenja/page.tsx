import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import LegalContent from "@/components/LegalContent/LegalContent";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/i18n";

const content = {
  sr: {
    metadata: {
      title: "Uslovi Korišćenja | Ivanjički Konaci",
      description: "Uslovi korišćenja usluga i sajta Ivanjički Konaci.",
    },
    title: "Uslovi Korišćenja",
    updated: "25. avgust 2026.",
    sections: [
      {
        heading: "1. Opšte Odredbe",
        paragraphs: [
          "Korišćenjem sajta Ivanjički Konaci i naših usluga smeštaja, prihvatate uslove navedene na ovoj stranici. Ukoliko se ne slažete sa bilo kojim delom uslova, molimo vas da ne koristite naše usluge.",
          "Zadržavamo pravo da povremeno izmenimo ove uslove. Izmene stupaju na snagu objavljivanjem na ovoj stranici.",
        ],
      },
      {
        heading: "2. Rezervacije",
        paragraphs: [
          "Rezervacija konaka se smatra potvrđenom nakon što gost i Ivanjički Konaci pisanim putem (email ili poruka) potvrde termin, broj gostiju i cenu boravka.",
          "Zadržavamo pravo da odbijemo ili otkažemo rezervaciju u slučaju netačnih podataka ili nedostupnosti konaka usled više sile.",
        ],
      },
      {
        heading: "3. Plaćanje",
        paragraphs: [
          "Način i dinamika plaćanja (avans, plaćanje po dolasku) dogovaraju se prilikom potvrde rezervacije. Cene su izražene u evrima (€) po noćenju, osim ako nije drugačije naznačeno.",
        ],
      },
      {
        heading: "4. Otkazivanje Rezervacije",
        paragraphs: [
          "Uslovi otkazivanja i eventualnog povraćaja sredstava zavise od termina otkazivanja u odnosu na datum dolaska, i dogovaraju se individualno prilikom rezervacije.",
        ],
      },
      {
        heading: "5. Odgovornost Gostiju",
        paragraphs: [
          "Gosti su dužni da se prema konaku i okolini odnose odgovorno i da nadoknade eventualnu štetu nastalu njihovom krivicom tokom boravka.",
          "Broj gostiju ne sme prelaziti kapacitet naveden prilikom rezervacije, osim uz prethodnu saglasnost.",
        ],
      },
      {
        heading: "6. Ograničenje Odgovornosti",
        paragraphs: [
          "Ivanjički Konaci ne snose odgovornost za gubitak ili štetu na ličnim stvarima gostiju, niti za okolnosti van naše kontrole (vremenski uslovi, viša sila i slično).",
        ],
      },
      {
        heading: "7. Kontakt",
        paragraphs: [
          "Za sva pitanja u vezi sa ovim uslovima možete nas kontaktirati putem stranice Kontakt ili na ivanjicki.konaci@gmail.com.",
        ],
      },
    ],
  },
  en: {
    metadata: {
      title: "Terms Of Use | Ivanjicki Konaci",
      description: "Terms for using the Ivanjicki Konaci website and services.",
    },
    title: "Terms Of Use",
    updated: "August 25, 2026",
    sections: [
      {
        heading: "1. General Terms",
        paragraphs: [
          "By using the Ivanjicki Konaci website and our accommodation services, you accept the terms listed on this page. If you do not agree with any part of these terms, please do not use our services.",
          "We reserve the right to update these terms from time to time. Changes become effective when published on this page.",
        ],
      },
      {
        heading: "2. Reservations",
        paragraphs: [
          "A room reservation is considered confirmed after the guest and Ivanjicki Konaci confirm the dates, number of guests and stay price in writing, by email or message.",
          "We reserve the right to refuse or cancel a reservation in case of incorrect information or room unavailability due to force majeure.",
        ],
      },
      {
        heading: "3. Payment",
        paragraphs: [
          "The payment method and schedule, including advance payment or payment on arrival, are agreed when the reservation is confirmed. Prices are stated in euros (€) per night unless noted otherwise.",
        ],
      },
      {
        heading: "4. Reservation Cancellation",
        paragraphs: [
          "Cancellation terms and any potential refund depend on when the cancellation is made in relation to the arrival date, and are agreed individually at the time of reservation.",
        ],
      },
      {
        heading: "5. Guest Responsibility",
        paragraphs: [
          "Guests must treat the room and surroundings responsibly and compensate for any damage caused by their fault during the stay.",
          "The number of guests must not exceed the capacity stated at the time of reservation, unless previously approved.",
        ],
      },
      {
        heading: "6. Limitation Of Liability",
        paragraphs: [
          "Ivanjicki Konaci is not responsible for loss of or damage to guests' personal belongings, or for circumstances outside our control, including weather conditions, force majeure and similar events.",
        ],
      },
      {
        heading: "7. Contact",
        paragraphs: [
          "For any questions about these terms, you can contact us through the Contact page or at ivanjicki.konaci@gmail.com.",
        ],
      },
    ],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function UsloviKoriscenjaPage() {
  const locale: Locale = await getLocale();
  const t = content[locale];

  return (
    <main>
      <PageHeader title={t.title} locale={locale} />
      <LegalContent updated={t.updated} sections={t.sections} locale={locale} />
    </main>
  );
}
