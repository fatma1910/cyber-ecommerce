import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutHero from "./components/AboutHero";
import AboutStory from "./components/AboutStory";
import AboutBenefits from "./components/AboutBenefits";
import AboutStats from "./components/AboutStats";
import AboutCta from "./components/AboutCta";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.about");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AboutPage() {
  return (
    <main className="bg-background">
      <AboutHero />
      <AboutStory />
      <AboutBenefits />
      <AboutStats />
      <AboutCta />
    </main>
  );
}
