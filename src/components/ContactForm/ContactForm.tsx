"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import styles from "./ContactForm.module.scss";

const copy = {
  sr: {
    success: "Hvala na poruci! Javićemo Vam se u najkraćem roku.",
    name: "Ime i prezime",
    namePlaceholder: "Vaše ime",
    phone: "Telefon (opciono)",
    message: "Poruka",
    messagePlaceholder:
      "Recite nam za koji termin i broj gostiju ste zainteresovani...",
    sending: "Slanje...",
    submit: "Pošalji Poruku",
  },
  en: {
    success: "Thank you for your message. We will get back to you as soon as possible.",
    name: "Full name",
    namePlaceholder: "Your name",
    phone: "Phone (optional)",
    message: "Message",
    messagePlaceholder: "Tell us your preferred dates and number of guests...",
    sending: "Sending...",
    submit: "Send Message",
  },
} as const;

export default function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const t = copy[locale];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
    }, 600);
  };

  if (status === "sent") {
    return <div className={styles.success}>{t.success}</div>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            {t.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={styles.input}
            placeholder={t.namePlaceholder}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={styles.input}
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="phone">
          {t.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={styles.input}
          placeholder="+381 6x xxx xxxx"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          className={styles.textarea}
          placeholder={t.messagePlaceholder}
        />
      </div>

      <button
        type="submit"
        className={styles.submit}
        disabled={status === "sending"}
      >
        {status === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
