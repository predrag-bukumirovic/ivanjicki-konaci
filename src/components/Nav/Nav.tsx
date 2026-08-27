"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { commonCopy, type Locale } from "@/lib/i18n";
import styles from "./Nav.module.scss";

const navLinkKeys = [
  { key: "home", href: "/" },
  { key: "rooms", href: "/konaci" },
  { key: "restaurant", href: "/restoran" },
  { key: "menu", href: "/meni" },
  { key: "gallery", href: "/galerija" },
  { key: "about", href: "/o-nama" },
  { key: "contact", href: "/kontakt" },
] as const;

const copy = {
  sr: {
    logoAlt: "Ivanjički konaci logo",
    closeMenu: "Zatvori meni",
    openMenu: "Otvori meni",
  },
  en: {
    logoAlt: "Ivanjicki Konaci logo",
    closeMenu: "Close menu",
    openMenu: "Open menu",
  },
} as const;

export default function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = copy[locale];
  const labels = commonCopy[locale];
  const currentPath = pathname || "/";
  const switchLocaleHref = (nextLocale: Locale) =>
    `/api/locale?lang=${nextLocale}&next=${encodeURIComponent(currentPath)}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/img/logo.png"
            alt={t.logoAlt}
            width={60}
            height={60}
            priority
          />
        </Link>

        <ul className={styles.links}>
          {navLinkKeys.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className={`${styles.link} ${
                  pathname === link.href ? styles.linkActive : ""
                }`}
              >
                {labels[link.key]}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className={styles.underline}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <span className={styles.lang}>
            <a
              href={switchLocaleHref("sr")}
              className={locale === "sr" ? styles.langActive : ""}
            >
              SR
            </a>
            <span>/</span>
            <a
              href={switchLocaleHref("en")}
              className={locale === "en" ? styles.langActive : ""}
            >
              EN
            </a>
          </span>

          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />
      )}

      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerHead}>
          <span className={styles.logo}>
            <Image
              src="/img/logo.png"
              alt={t.logoAlt}
              width={48}
              height={48}
            />
          </span>
          <button
            type="button"
            className={styles.drawerClose}
            onClick={() => setMenuOpen(false)}
            aria-label={t.closeMenu}
          >
            <FiX size={22} />
          </button>
        </div>

        <ul className={styles.mobileMenu}>
          {navLinkKeys.map((link, i) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className={`${styles.mobileLink} ${
                  pathname === link.href ? styles.linkActive : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <span className={styles.mobileLinkIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {labels[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.drawerFooter}>
          <Link
            href="/kontakt"
            className={styles.drawerCta}
            onClick={() => setMenuOpen(false)}
          >
            {labels.bookNow}
          </Link>
          <a href="tel:+381606130776" className={styles.drawerContact}>
            +381 60 6130776
          </a>
        </div>
      </div>
    </>
  );
}
