import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import FloatingActions from "@/components/FloatingActions/FloatingActions";
import { getLocale } from "@/lib/server-locale";
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
        title: "Ivanjički Konaci",
        description: "Pobegnite od gradske vreve u Ivanjičke konake.",
      }
    : {
        title: "Ivanjicki Konaci",
        description: "Escape the city noise at Ivanjicki Konaci.",
      };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${montserrat.variable}`}
    >
      <body>
        <Nav locale={locale} />
        {children}
        <Footer locale={locale} />
        <FloatingActions locale={locale} />
      </body>
    </html>
  );
}
