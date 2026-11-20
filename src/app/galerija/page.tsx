import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";
import PageHeader from "@/components/PageHeader/PageHeader";
import { getGalleryImages } from "@/data/gallery";
import { getLocale } from "@/lib/server-locale";
import styles from "./page.module.scss";

const content = {
  sr: {
    metadata: {
      title: "Galerija | Ivanjički konaci",
      description:
        "Fotografije bazena, terasa, imanja i hrane iz restorana Ivanjičkih konaka.",
    },
    kicker: "Galerija",
    title: "Fotografije",
    lede: "Bazen, terase, staze kroz voćnjak i hrana iz našeg restorana. Kliknite na fotografiju za veći prikaz.",
  },
  en: {
    metadata: {
      title: "Gallery | Ivanjicki Konaci",
      description:
        "Photos of the pool, terraces, grounds and restaurant food at Ivanjicki Konaci.",
    },
    kicker: "Gallery",
    title: "Photos",
    lede: "The pool, terraces, orchard paths and food from our restaurant. Tap a photo to see it larger.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function GalerijaPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <main>
      <PageHeader kicker={t.kicker} title={t.title} lede={t.lede} />

      <section className={styles.section}>
        <div className="container">
          <GalleryGrid images={getGalleryImages(locale)} locale={locale} />
        </div>
      </section>
    </main>
  );
}
