import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader/PageHeader";
import Reveal from "@/components/Reveal/Reveal";
import StatsBar from "@/components/StatsBar/StatsBar";
import Testimonials from "@/components/Testimonials/Testimonials";
import CallToAction from "@/components/CallToAction/CallToAction";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/i18n";
import styles from "./page.module.scss";

const content = {
  sr: {
    metadata: {
      title: "O Nama | Ivanjički Konaci",
      description:
        "Upoznajte priču iza Ivanjičkih konaka, smeštaja stvorenog za miran boravak u prirodi.",
    },
    title: "O Nama",
    subtitle:
      "Verujemo da odmor treba da bude jednostavan, miran i blizu prirode, zato smo stvorili Ivanjičke konake.",
    imageAlt: "Ivanjički konaci u prirodi",
    label: "Naša Priča",
    heading: "Stvoreno Za Ljude Kojima Treba Predah",
    paragraph1:
      "Ivanjički konaci su nastali iz želje da ponudimo nešto drugačije od standardnog smeštaja: mesto gde priroda, mir i udobnost dolaze zajedno. Svaki konak je pažljivo pripremljen tako da gostima pruži osećaj bekstva od gradske vreve, bez odricanja od udobnosti.",
    paragraph2:
      "Godinama unazad ugostili smo goste iz celog sveta, sarađujemo sa proverenim partnerima u turizmu i svakim danom radimo na tome da naši konaci budu mesto kojem se gosti rado vraćaju.",
  },
  en: {
    metadata: {
      title: "About | Ivanjicki Konaci",
      description:
        "Learn the story behind Ivanjicki Konaci, accommodation created for a peaceful stay in nature.",
    },
    title: "About",
    subtitle:
      "We believe rest should be simple, peaceful and close to nature, which is why we created Ivanjicki Konaci.",
    imageAlt: "Ivanjicki Konaci in nature",
    label: "Our Story",
    heading: "Created For People Who Need A Real Break",
    paragraph1:
      "Ivanjicki Konaci was created from the wish to offer something different from standard accommodation: a place where nature, calm and comfort come together. Every room is carefully prepared to give guests a sense of escape from city noise, without giving up comfort.",
    paragraph2:
      "Over the years we have welcomed guests from around the world, worked with trusted tourism partners, and kept improving the experience so guests are happy to return.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return content[locale].metadata;
}

export default async function ONamaPage() {
  const locale: Locale = await getLocale();
  const t = content[locale];

  return (
    <main>
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        locale={locale}
      />

      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <Reveal>
              <div className={styles.imageWrap}>
                <Image
                  src="/img/naslovna.png"
                  alt={t.imageAlt}
                  fill
                  priority
                  className={styles.image}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className={styles.label}>{t.label}</span>
              <h2 className={styles.heading}>{t.heading}</h2>
              <p className={styles.text}>{t.paragraph1}</p>
              <p className={styles.text}>{t.paragraph2}</p>
            </Reveal>
          </div>

          <StatsBar locale={locale} />
        </div>
      </section>

      <Testimonials locale={locale} />
      <CallToAction locale={locale} />
    </main>
  );
}
