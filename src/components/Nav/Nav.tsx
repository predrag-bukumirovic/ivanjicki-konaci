"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { commonCopy, navLinks, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { lockScroll, unlockScroll } from "@/lib/smooth-scroll";
import styles from "./Nav.module.scss";

const copy = {
  sr: {
    brand: "Ivanjički konaci",
    closeMenu: "Zatvori meni",
    openMenu: "Otvori meni",
    language: "Jezik",
    mainNav: "Glavna navigacija",
  },
  en: {
    brand: "Ivanjicki Konaci",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    language: "Language",
    mainNav: "Main navigation",
  },
} as const;

export default function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = copy[locale];
  const labels = commonCopy[locale];
  // On the menu the header scrolls away so the menu's own sticky bar gets the whole top edge.
  const isMenuPage = pathname === "/meni";

  const switchLocaleHref = (nextLocale: Locale) =>
    `/api/locale?lang=${nextLocale}&next=${encodeURIComponent(pathname)}`;
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    lockScroll();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [menuOpen]);

  const languageSwitch = (
    <span className={styles.lang} aria-label={t.language}>
      {(["sr", "en"] as const).map((item) => (
        <a
          href={switchLocaleHref(item)}
          className={locale === item ? styles.langActive : undefined}
          aria-current={locale === item ? "true" : undefined}
          hrefLang={item}
          key={item}
        >
          {item.toUpperCase()}
        </a>
      ))}
    </span>
  );

  return (
    <>
      <header
        className={`${styles.nav} ${isMenuPage ? styles.navStatic : ""} ${
          scrolled && !isMenuPage ? styles.navScrolled : ""
        }`}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.brand}>
            <Image
              src="/img/logo.png"
              alt=""
              width={40}
              height={40}
              priority
            />
            <span>{t.brand}</span>
          </Link>

          <nav className={styles.links} aria-label={t.mainNav}>
            {navLinks.map((link) => (
              <Link
                href={link.href}
                className={isActive(link.href) ? styles.linkActive : undefined}
                aria-current={isActive(link.href) ? "page" : undefined}
                key={link.key}
              >
                {labels[link.key]}
              </Link>
            ))}
          </nav>

          <div className={styles.right}>
            {languageSwitch}
            <Link href="/kontakt" className={`button button-dark ${styles.cta}`}>
              {labels.bookNow}
            </Link>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setMenuOpen(true)}
              aria-label={t.openMenu}
              aria-expanded={menuOpen}
              aria-controls="site-drawer"
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}

      <div
        id="site-drawer"
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className={styles.drawerHead}>
          <Link
            href="/"
            className={styles.brand}
            onClick={() => setMenuOpen(false)}
            tabIndex={-1}
          >
            <Image src="/img/logo.png" alt="" width={36} height={36} />
            <span>{t.brand}</span>
          </Link>
          <button
            type="button"
            className={styles.drawerClose}
            onClick={() => setMenuOpen(false)}
            aria-label={t.closeMenu}
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className={styles.drawerLinks}>
          {[{ key: "home", href: "/" } as const, ...navLinks].map((link) => (
            <Link
              href={link.href}
              className={
                (link.href === "/" ? pathname === "/" : isActive(link.href))
                  ? styles.linkActive
                  : undefined
              }
              onClick={() => setMenuOpen(false)}
              key={link.key}
            >
              {labels[link.key]}
            </Link>
          ))}
        </nav>

        <div className={styles.drawerFooter}>
          <Link
            href="/kontakt"
            className="button button-dark"
            onClick={() => setMenuOpen(false)}
          >
            {labels.bookNow}
          </Link>
          <div className={styles.drawerMeta}>
            <a href={site.phoneHref} className={styles.drawerPhone}>
              {site.phone}
            </a>
            {languageSwitch}
          </div>
        </div>
      </div>
    </>
  );
}
