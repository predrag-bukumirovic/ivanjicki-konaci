"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal/Reveal";
import type { MenuBadge, MenuCategory, MenuGroup } from "@/data/menu";
import styles from "./page.module.scss";

type MenuExplorerLabels = {
  allLabel: string;
  groupLabels: Record<MenuGroup, string>;
  groupNavLabel: string;
  navLabel: string;
  priceLabel: string;
  badgeLabels: Record<MenuBadge, string>;
};

function formatPrice(price: string) {
  const normalized = price.trim();
  const numericPrice = Number(normalized);
  const prefixedPrice = normalized.match(/^(\d+)(\s+RSD.*)$/i);

  if (Number.isFinite(numericPrice) && !/rsd/i.test(normalized)) {
    return `${new Intl.NumberFormat("sr-RS").format(numericPrice)} RSD`;
  }

  if (prefixedPrice) {
    return `${new Intl.NumberFormat("sr-RS").format(
      Number(prefixedPrice[1]),
    )}${prefixedPrice[2]}`;
  }

  return normalized;
}

export default function MenuExplorer({
  categories,
  labels,
}: {
  categories: MenuCategory[];
  labels: MenuExplorerLabels;
}) {
  const [activeGroup, setActiveGroup] = useState<MenuGroup>("food");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const groupCategories = useMemo(
    () => categories.filter((category) => category.group === activeGroup),
    [activeGroup, categories],
  );
  const visibleCategories = useMemo(
    () =>
      activeCategoryId === "all"
        ? groupCategories
        : groupCategories.filter((category) => category.id === activeCategoryId),
    [activeCategoryId, groupCategories],
  );

  const menuGroups: MenuGroup[] = ["food", "drinks"];

  return (
    <>
      <Reveal delay={0.03}>
        <div className={styles.groupSwitch} aria-label={labels.groupNavLabel}>
          {menuGroups.map((group) => (
            <button
              type="button"
              className={activeGroup === group ? styles.filterActive : ""}
              onClick={() => {
                setActiveGroup(group);
                setActiveCategoryId("all");
              }}
              aria-pressed={activeGroup === group}
              key={group}
            >
              {labels.groupLabels[group]}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className={styles.categoryNav} aria-label={labels.navLabel}>
          <button
            type="button"
            className={activeCategoryId === "all" ? styles.filterActive : ""}
            onClick={() => setActiveCategoryId("all")}
            aria-pressed={activeCategoryId === "all"}
          >
            {labels.allLabel}
          </button>
          {groupCategories.map((category) => (
            <button
              type="button"
              className={
                activeCategoryId === category.id ? styles.filterActive : ""
              }
              onClick={() => setActiveCategoryId(category.id)}
              aria-pressed={activeCategoryId === category.id}
              key={category.id}
            >
              {category.title}
            </button>
          ))}
        </div>
      </Reveal>

      <div className={styles.categoryStack}>
        {visibleCategories.map((category) => (
          <section className={styles.category} key={category.id}>
            <Reveal className={styles.categoryHead}>
              <h2>{category.title}</h2>
            </Reveal>

            <div className={styles.itemGrid}>
              {category.items.map((item, itemIndex) => (
                <Reveal
                  className={styles.itemCard}
                  delay={itemIndex * 0.03}
                  key={item.name}
                >
                  <div className={styles.itemTop}>
                    <h3>{item.name}</h3>
                    <span className={styles.price}>
                      <span>{labels.priceLabel}</span>
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p>{item.description}</p>
                  {item.badges && item.badges.length > 0 && (
                    <div className={styles.badges}>
                      {item.badges.map((badge) => (
                        <span
                          className={`${styles.badge} ${styles[badge]}`}
                          key={badge}
                        >
                          {labels.badgeLabels[badge]}
                        </span>
                      ))}
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
