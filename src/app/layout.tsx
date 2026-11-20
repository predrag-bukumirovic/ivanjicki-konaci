import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import FloatingActions from "@/components/FloatingActions/FloatingActions";
import Preloader from "@/components/Preloader/Preloader";
import RouteProgress from "@/components/RouteProgress/RouteProgress";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import { preloaderHeadScript } from "@/lib/preloader";
import { getLocale } from "@/lib/server-locale";
import "lenis/dist/lenis.css";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "../../public/fonts/SpaceGrotesk.ttf",
  variable: "--font-heading",
});

const montserrat = localFont({
  src: "../../public/fonts/Montserrat.ttf",
  variable: "--font-body",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return locale === "sr"
    ? {
        title: "Ivanjički konaci — smeštaj, restoran i bazen u Ivanjici",
        description:
          "Smeštaj sa restoranom i bazenom nadomak Ivanjice: šest tipova soba, domaća kuhinja i pogled na brda.",
      }
    : {
        title: "Ivanjicki Konaci — rooms, restaurant and pool in Ivanjica",
        description:
          "Rooms with a restaurant and pool just outside Ivanjica, Serbia: six room types, home cooking and views of the hills.",
      };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${montserrat.variable}`}
      // The head script below adds a class before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderHeadScript }} />
      </head>
      <body>
        <Preloader locale={locale} />
        <RouteProgress />
        <Nav locale={locale} />
        {children}
        <Footer locale={locale} />
        <FloatingActions locale={locale} />
        <SmoothScroll />
      </body>
    </html>
  );
}
