import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import LegalContent from "@/components/LegalContent/LegalContent";
import { getLocale } from "@/lib/server-locale";

const content = {
  sr: {
    metadata: {
      title: "Politika privatnosti | Ivanjički konaci",
      description: "Kako Ivanjički Konaci prikupljaju i koriste vaše podatke.",
    },
    title: "Politika privatnosti",
    updated: "25. avgust 2026.",
    sections: [
      {
        heading: "1. Koje podatke prikupljamo",
        paragraphs: [
          "Prilikom rezervacije ili slanja upita putem kontakt forme, prikupljamo podatke koje nam sami dostavite: ime i prezime, email adresu, broj telefona i sadržaj poruke.",
        ],
      },
      {
        heading: "2. Kako koristimo vaše podatke",
        paragraphs: [
          "Podatke koristimo isključivo u svrhu obrade rezervacija, komunikacije sa gostima i unapređenja naših usluga. Ne prosleđujemo vaše podatke trećim licima bez vaše saglasnosti, osim kada je to zakonski obavezno.",
        ],
      },
      {
        heading: "3. Čuvanje podataka",
        paragraphs: [
          "Vaše podatke čuvamo onoliko dugo koliko je potrebno za svrhu radi koje su prikupljeni, odnosno u skladu sa zakonskim obavezama.",
        ],
      },
      {
        heading: "4. Kolačići (cookies)",
        paragraphs: [
          "Sajt može koristiti osnovne kolačiće u svrhu ispravnog funkcionisanja i poboljšanja korisničkog iskustva. Onemogućavanjem kolačića u vašem pretraživaču, pojedine funkcionalnosti sajta mogu biti ograničene.",
        ],
      },
      {
        heading: "5. Vaša prava",
        paragraphs: [
          "Imate pravo da zatražite uvid, izmenu ili brisanje svojih ličnih podataka koje čuvamo. Zahtev možete poslati na ivanjicki.konaci@gmail.com.",
        ],
      },
      {
        heading: "6. Kontakt",
        paragraphs: [
          "Za sva pitanja u vezi sa obradom vaših ličnih podataka, obratite nam se putem stranice Kontakt ili na ivanjicki.konaci@gmail.com.",
        ],
      },
    ],
  },
  en: {
    metadata: {
      title: "Privacy policy | Ivanjicki Konaci",
      description: "How Ivanjicki Konaci collects and uses your data.",
    },
    title: "Privacy policy",
    updated: "August 25, 2026",
    sections: [
      {
        heading: "1. What data we collect",
        paragraphs: [
          "When you make a reservation or send an inquiry through the contact form, we collect the information you provide: full name, email address, phone number and message content.",
        ],
      },
      {
        heading: "2. How we use your data",
        paragraphs: [
          "We use the data only to process reservations, communicate with guests and improve our services. We do not share your data with third parties without your consent, except where required by law.",
        ],
      },
      {
        heading: "3. Data retention",
        paragraphs: [
          "We keep your data for as long as necessary for the purpose for which it was collected, or in line with legal obligations.",
        ],
      },
      {
        heading: "4. Cookies",
        paragraphs: [
          "The site may use basic cookies to function correctly and improve the user experience. If you disable cookies in your browser, some site features may be limited.",
        ],
      },
      {
        heading: "5. Your rights",
        paragraphs: [
          "You have the right to request access to, correction of or deletion of the personal data we store. You can send a request to ivanjicki.konaci@gmail.com.",
        ],
      },
      {
        heading: "6. Contact",
        paragraphs: [
          "For any questions about the processing of your personal data, contact us through the Contact page or at ivanjicki.konaci@gmail.com.",
        ],
      },
    ],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function PolitikaPrivatnostiPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <main>
      <PageHeader
        kicker={locale === "sr" ? "Pravne informacije" : "Legal"}
        title={t.title}
        lede={`${locale === "sr" ? "Poslednja izmena" : "Last updated"}: ${t.updated}`}
      />
      <LegalContent sections={t.sections} />
    </main>
  );
}
