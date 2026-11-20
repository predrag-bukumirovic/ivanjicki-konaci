import type { Metadata } from "next";
import Link from "next/link";
import { getMenu } from "@/data/menu";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/i18n";
import MenuExplorer, { type MenuExplorerLabels } from "./MenuExplorer";
import styles from "./page.module.scss";

const pageCopy: Record<
  Locale,
  {
    metadata: Metadata;
    kicker: string;
    title: string;
    lede: string;
    helpTitle: string;
    restaurantLink: string;
    labels: MenuExplorerLabels;
  }
> = {
  sr: {
    metadata: {
      title: "Meni | Ivanjički Konaci",
      description:
        "Meni restorana Ivanjički Konaci: doručak, roštilj, jela po porudžbini, domaća i strana vina i kompletna karta pića.",
    },
    kicker: "Restoran Ivanjički Konaci",
    title: "Meni",
    lede: "Sve cene su u dinarima (RSD).",
    helpTitle: "Alergeni i posebni zahtevi",
    restaurantLink: "O restoranu",
    labels: {
      groups: { food: "Jela", drinks: "Pića" },
      groupNav: "Jela ili pića",
      categoryNav: "Kategorije menija",
      searchLabel: "Pretraga menija",
      searchPlaceholder: "Pretraži jela i pića",
      clearSearch: "Obriši pretragu",
      results: "Pronađeno",
      noResults: "Ništa nije pronađeno za „{q}“.",
      noResultsHint: "Probajte drugi naziv, npr. „pljeskavica“ ili „vino“.",
    },
  },
  en: {
    metadata: {
      title: "Menu | Ivanjicki Konaci",
      description:
        "Ivanjicki Konaci restaurant menu: breakfast, grill, dishes to order, local and international wines and a full drinks list.",
    },
    kicker: "Ivanjicki Konaci Restaurant",
    title: "Menu",
    lede: "All prices are in Serbian dinars (RSD).",
    helpTitle: "Allergens and special requests",
    restaurantLink: "About the restaurant",
    labels: {
      groups: { food: "Food", drinks: "Drinks" },
      groupNav: "Food or drinks",
      categoryNav: "Menu categories",
      searchLabel: "Search the menu",
      searchPlaceholder: "Search food and drinks",
      clearSearch: "Clear search",
      results: "Found",
      noResults: "Nothing found for “{q}”.",
      noResultsHint: "Try another name, e.g. “steak” or “wine”.",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageCopy[locale].metadata;
}

export default async function MeniPage() {
  const locale = await getLocale();
  const t = pageCopy[locale];
  const menu = getMenu(locale);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.kicker}>{t.kicker}</p>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.lede}>{t.lede}</p>
        </header>

        <MenuExplorer
          categories={menu.categories}
          labels={t.labels}
          locale={locale}
        />
      </div>

      <section className={styles.help}>
        <div className={`${styles.container} ${styles.helpInner}`}>
          <div>
            <h2 className={styles.helpTitle}>{t.helpTitle}</h2>
            <p className={styles.helpText}>{menu.notice}</p>
          </div>
          <div className={styles.helpLinks}>
            <a href="tel:+381606130776">+381 60 6130776</a>
            <Link href="/restoran">{t.restaurantLink}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
