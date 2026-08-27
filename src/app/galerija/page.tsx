import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";
import { getGalleryImages } from "@/data/gallery";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/i18n";
import styles from "./page.module.scss";

const content = {
  sr: {
    metadata: {
      title: "Galerija | Ivanjički Konaci",
      description:
        "Pogledajte fotografije iz Booking galerije objekta Ivanjički Konaci.",
    },
    title: "Galerija",
    subtitle:
      "Pogledajte fotografije iz glavne Booking galerije objekta Lux smeštaj Ivanjički konaci.",
  },
  en: {
    metadata: {
      title: "Gallery | Ivanjicki Konaci",
      description: "View photos from the Booking gallery for Ivanjicki Konaci.",
    },
    title: "Gallery",
    subtitle:
      "View photos from the main Booking gallery for Lux Accommodation Ivanjicki Konaci.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function GalerijaPage() {
  const locale: Locale = await getLocale();
  const t = content[locale];
  const galleryImages = getGalleryImages(locale);

  return (
    <main>
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        locale={locale}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <GalleryGrid images={galleryImages} locale={locale} />
        </div>
      </section>
    </main>
  );
}
