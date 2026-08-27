import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import CabinShowcase from "@/components/CabinShowcase/CabinShowcase";
import CabinsGrid from "@/components/CabinsGrid/CabinsGrid";
import Testimonials from "@/components/Testimonials/Testimonials";
import CallToAction from "@/components/CallToAction/CallToAction";
import { getLocale } from "@/lib/server-locale";

export default async function Home() {
  const locale = await getLocale();

  return (
    <main>
      <Hero locale={locale} />
      <About locale={locale} />
      <CabinShowcase locale={locale} />
      <CabinsGrid limit={3} locale={locale} />
      <Testimonials locale={locale} />
      <CallToAction locale={locale} />
    </main>
  );
}
