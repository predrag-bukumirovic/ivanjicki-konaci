import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import CabinCard from "@/components/CabinCard/CabinCard";
import CallToAction from "@/components/CallToAction/CallToAction";
import { getCabins } from "@/data/cabins";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/i18n";
import styles from "./page.module.scss";

const content = {
  sr: {
    metadata: {
      title: "Sobe | Ivanjički Konaci",
      description:
        "Pogledajte sobe i smeštajne jedinice u ponudi objekta Ivanjički Konaci.",
    },
    title: "Sobe I Smeštajne Jedinice",
    subtitle:
      "Pregled stvarnih soba u objektu Lux smeštaj Ivanjički konaci, sa kapacitetom, kvadraturom, krevetima i ključnim sadržajima.",
  },
  en: {
    metadata: {
      title: "Rooms | Ivanjicki Konaci",
      description:
        "Explore the rooms and accommodation units available at Ivanjicki Konaci.",
    },
    title: "Rooms And Accommodation",
    subtitle:
      "A precise overview of the real rooms at Lux Accommodation Ivanjicki Konaci, including capacity, size, beds and key amenities.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function KonaciPage() {
  const locale: Locale = await getLocale();
  const cabins = getCabins(locale);
  const t = content[locale];

  return (
    <main>
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        locale={locale}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {cabins.map((cabin, i) => (
              <CabinCard
                cabin={cabin}
                delay={i * 0.1}
                key={cabin.slug}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <CallToAction locale={locale} />
    </main>
  );
}
