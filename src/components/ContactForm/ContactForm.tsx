"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import styles from "./ContactForm.module.scss";

const copy = {
  sr: {
    name: "Ime i prezime",
    phone: "Telefon",
    optional: "opciono",
    arrival: "Dolazak",
    departure: "Odlazak",
    guests: "Broj gostiju",
    message: "Poruka",
    messagePlaceholder:
      "Npr. koja soba vas zanima, da li dolazite sa decom, posebni zahtevi…",
    submit: "Pošalji upit",
    note: `Upit se šalje iz vašeg email programa — otvoriće se poruka za ${site.email}, spremna za slanje.`,
    sentTitle: "Poruka je spremna u vašem email programu.",
    sentText: `Ako se program nije otvorio, pišite nam direktno na ${site.email} ili pozovite ${site.phone}.`,
    again: "Izmeni upit",
    subject: "Upit za smeštaj",
  },
  en: {
    name: "Full name",
    phone: "Phone",
    optional: "optional",
    arrival: "Arrival",
    departure: "Departure",
    guests: "Guests",
    message: "Message",
    messagePlaceholder:
      "E.g. which room you are interested in, travelling with children, special requests…",
    submit: "Send inquiry",
    note: `The inquiry is sent from your own email app — a message to ${site.email} will open, ready to send.`,
    sentTitle: "Your message is ready in your email app.",
    sentText: `If it did not open, email us at ${site.email} or call ${site.phone}.`,
    again: "Edit inquiry",
    subject: "Accommodation inquiry",
  },
} as const;

/** yyyy-mm-dd → dd.mm.yyyy. */
function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}.${month}.${year}.` : value;
}

export default function ContactForm({ locale }: { locale: Locale }) {
  const [opened, setOpened] = useState(false);
  const t = copy[locale];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (key: string) => String(data.get(key) ?? "").trim();

    const name = field("name");
    const lines = [
      [t.name, name],
      [t.phone, field("phone")],
      [t.arrival, field("arrival") && formatDate(field("arrival"))],
      [t.departure, field("departure") && formatDate(field("departure"))],
      [t.guests, field("guests")],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`);

    const message = field("message");
    const body = [...lines, ...(message ? ["", message] : [])].join("\n");
    const subject = `${t.subject} — ${name}`;

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  if (opened) {
    return (
      <div className={styles.sent} role="status">
        <p className={styles.sentTitle}>{t.sentTitle}</p>
        <p>{t.sentText}</p>
        <button
          type="button"
          className="text-link"
          onClick={() => setOpened(false)}
        >
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="cf-name">{t.name}</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-phone">
          {t.phone} <span>({t.optional})</span>
        </label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-arrival">{t.arrival}</label>
          <input id="cf-arrival" name="arrival" type="date" />
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-departure">{t.departure}</label>
          <input id="cf-departure" name="departure" type="date" />
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-guests">{t.guests}</label>
          <input
            id="cf-guests"
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message">
          {t.message} <span>({t.optional})</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder={t.messagePlaceholder}
        />
      </div>

      <div className={styles.footer}>
        <button type="submit" className="button button-dark">
          {t.submit}
        </button>
        <p className={styles.note}>{t.note}</p>
      </div>
    </form>
  );
}
