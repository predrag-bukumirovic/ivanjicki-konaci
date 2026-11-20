"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import type { MenuCategory, MenuGroup, MenuItem } from "@/data/menu";
import type { Locale } from "@/lib/i18n";
import { scrollToY } from "@/lib/smooth-scroll";
import styles from "./page.module.scss";

export type MenuExplorerLabels = {
  groups: Record<MenuGroup, string>;
  groupNav: string;
  categoryNav: string;
  searchLabel: string;
  searchPlaceholder: string;
  clearSearch: string;
  results: string;
  /** "{q}" is replaced with the search query. */
  noResults: string;
  noResultsHint: string;
};

const GROUPS: MenuGroup[] = ["food", "drinks"];
const DESKTOP_QUERY = "(min-width: 960px)";

/** 1350 → "1.350" (sr) / "1,350" (en). Done by hand so server and client always match. */
function formatPrice(price: string, locale: Locale) {
  if (!/^\d+$/.test(price)) return price;
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, locale === "sr" ? "." : ",");
}

/** Pulls a trailing quantity out of the name: "Kajmak (100 g)" → ["Kajmak", "100 g"]. */
function splitName(name: string): [string, string | null] {
  const inParens = name.match(/^(.*\S)\s*\(([^()]+)\)$/);
  if (inParens) return [inParens[1], inParens[2]];
  const volume = name.match(/^(.*\S)\s+(\d+(?:[.,]\d+)?\s?l)$/);
  if (volume) return [volume[1], volume[2]];
  return [name, null];
}

/** Case- and diacritic-insensitive: "cevapi" finds "Ćevapi", "karadjordjeva" finds "Karađorđeva". */
function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/dj/g, "d");
}

function words(value: string) {
  return normalize(value).split(/[^a-z0-9]+/).filter(Boolean);
}

/**
 * Query words, with a trailing vowel trimmed from longer ones so Serbian word
 * forms still match: "vino" → "vin" finds "Bela vina", "salata" → "salat"
 * finds "Zimske salate". Each token must match the start of a word.
 */
function searchTokens(query: string) {
  return words(query).map((token) =>
    token.length >= 4 ? token.replace(/[aeiou]$/, "") : token,
  );
}

/** Distance from the viewport top at which a section counts as "current". */
function stickyOffset(bar: HTMLElement | null) {
  if (window.matchMedia(DESKTOP_QUERY).matches) return 32;
  return (bar?.offsetHeight ?? 0) + 12;
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function MenuRow({ item, locale }: { item: MenuItem; locale: Locale }) {
  const [name, meta] = splitName(item.name);

  return (
    <li className={styles.item}>
      <div className={styles.itemText}>
        <h3 className={styles.itemName}>
          {name}
          {meta && <span className={styles.itemMeta}>{meta}</span>}
        </h3>
        {item.description && (
          <p className={styles.itemDesc}>{item.description}</p>
        )}
      </div>
      <span className={styles.itemPrice}>
        {formatPrice(item.price, locale)}
      </span>
    </li>
  );
}

function CategorySection({
  category,
  items = category.items,
  locale,
  sectionRef,
}: {
  category: MenuCategory;
  items?: MenuItem[];
  locale: Locale;
  sectionRef?: (element: HTMLElement | null) => void;
}) {
  const headingId = `meni-${category.id}`;

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      aria-labelledby={headingId}
    >
      <header className={styles.sectionHead}>
        <h2 className={styles.sectionTitle} id={headingId}>
          {category.title}
        </h2>
        {category.subtitle && (
          <p className={styles.sectionNote}>{category.subtitle}</p>
        )}
      </header>
      <ul className={styles.items}>
        {items.map((item) => (
          <MenuRow item={item} locale={locale} key={item.name} />
        ))}
      </ul>
    </section>
  );
}

export default function MenuExplorer({
  categories,
  labels,
  locale,
}: {
  categories: MenuCategory[];
  labels: MenuExplorerLabels;
  locale: Locale;
}) {
  const [group, setGroup] = useState<MenuGroup>("food");
  const [activeId, setActiveId] = useState(
    () => categories.find((category) => category.group === "food")?.id ?? "",
  );
  const [query, setQuery] = useState("");

  const layoutRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef(new Map<string, HTMLElement>());
  // While a tab-triggered smooth scroll runs, the scroll-spy stays quiet.
  // Stored as a performance.now() timestamp (same clock as event.timeStamp).
  const scrollLockUntil = useRef(0);

  const groupCategories = useMemo(
    () => categories.filter((category) => category.group === group),
    [categories, group],
  );

  const trimmedQuery = query.trim();
  const searching = trimmedQuery.length > 0;

  const results = useMemo(() => {
    const tokens = searchTokens(trimmedQuery);
    if (tokens.length === 0) return [];

    return categories.flatMap((category) => {
      const items = category.items.filter((item) => {
        const haystack = words(
          `${category.title} ${item.name} ${item.description ?? ""}`,
        );
        return tokens.every((token) =>
          haystack.some((word) => word.startsWith(token)),
        );
      });
      return items.length > 0 ? [{ category, items }] : [];
    });
  }, [categories, trimmedQuery]);

  const resultCount = results.reduce(
    (sum, result) => sum + result.items.length,
    0,
  );

  // Scroll-spy: highlight the category currently under the sticky bar.
  useEffect(() => {
    if (searching) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (performance.now() < scrollLockUntil.current) return;

      const offset = stickyOffset(barRef.current) + 8;
      let current = groupCategories[0]?.id ?? "";
      for (const category of groupCategories) {
        const section = sectionRefs.current.get(category.id);
        if (section && section.getBoundingClientRect().top <= offset) {
          current = category.id;
        }
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [groupCategories, searching]);

  // Keep the active tab visible inside the (horizontally or vertically) scrolling tab list.
  useEffect(() => {
    const tabs = tabsRef.current;
    const tab = tabs?.querySelector<HTMLElement>(
      `[data-category="${activeId}"]`,
    );
    if (!tabs || !tab) return;

    if (tabs.scrollWidth > tabs.clientWidth + 1) {
      tabs.scrollTo({
        left: tab.offsetLeft - (tabs.clientWidth - tab.offsetWidth) / 2,
        behavior: scrollBehavior(),
      });
    } else if (tabs.scrollHeight > tabs.clientHeight + 1) {
      tabs.scrollTo({
        top: tab.offsetTop - (tabs.clientHeight - tab.offsetHeight) / 2,
        behavior: scrollBehavior(),
      });
    }
  }, [activeId, group]);

  const goToCategory = (id: string, clickedAt: number) => {
    const section = sectionRefs.current.get(id);
    if (!section) return;

    setActiveId(id);
    scrollLockUntil.current = clickedAt + 1200;
    scrollToY(
      section.getBoundingClientRect().top +
        window.scrollY -
        stickyOffset(barRef.current),
    );
  };

  const switchGroup = (next: MenuGroup, clickedAt: number) => {
    if (next === group) return;

    setGroup(next);
    setActiveId(
      categories.find((category) => category.group === next)?.id ?? "",
    );

    // If the guest is deep in the list, jump back to the start of the new list.
    const layout = layoutRef.current;
    if (layout) {
      const top = layout.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > top) {
        scrollLockUntil.current = clickedAt + 300;
        scrollToY(top, false);
      }
    }
  };

  const registerSection = (id: string) => (element: HTMLElement | null) => {
    if (element) sectionRefs.current.set(id, element);
    else sectionRefs.current.delete(id);
  };

  return (
    <>
      <div className={styles.search} role="search">
        <FiSearch className={styles.searchIcon} size={18} aria-hidden />
        <input
          type="search"
          className={styles.searchInput}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setQuery("");
            if (event.key === "Enter") event.currentTarget.blur();
          }}
          placeholder={labels.searchPlaceholder}
          aria-label={labels.searchLabel}
          enterKeyHint="search"
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button
            type="button"
            className={styles.searchClear}
            onClick={() => setQuery("")}
            aria-label={labels.clearSearch}
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {searching ? (
        <div className={styles.results} aria-live="polite">
          {results.length > 0 ? (
            <>
              <p className={styles.resultsCount}>
                {labels.results}: {resultCount}
              </p>
              {results.map(({ category, items }) => (
                <CategorySection
                  category={category}
                  items={items}
                  locale={locale}
                  key={category.id}
                />
              ))}
            </>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>
                {labels.noResults.replace("{q}", trimmedQuery)}
              </p>
              <p>{labels.noResultsHint}</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.layout} ref={layoutRef}>
          <div className={styles.bar} ref={barRef}>
            <div
              className={styles.switch}
              role="group"
              aria-label={labels.groupNav}
            >
              {GROUPS.map((item) => (
                <button
                  type="button"
                  className={group === item ? styles.switchActive : undefined}
                  onClick={(event) => switchGroup(item, event.timeStamp)}
                  aria-pressed={group === item}
                  key={item}
                >
                  {labels.groups[item]}
                </button>
              ))}
            </div>

            <nav
              className={styles.tabs}
              ref={tabsRef}
              aria-label={labels.categoryNav}
            >
              {groupCategories.map((category) => (
                <button
                  type="button"
                  className={
                    category.id === activeId ? styles.tabActive : undefined
                  }
                  onClick={(event) =>
                    goToCategory(category.id, event.timeStamp)
                  }
                  aria-current={category.id === activeId ? "true" : undefined}
                  data-category={category.id}
                  key={category.id}
                >
                  {category.title}
                </button>
              ))}
            </nav>
          </div>

          <div className={styles.sections}>
            {groupCategories.map((category) => (
              <CategorySection
                category={category}
                locale={locale}
                sectionRef={registerSection(category.id)}
                key={category.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
