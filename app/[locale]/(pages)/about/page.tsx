import AboutHero from "./components/AboutHero";
import AboutStory from "./components/AboutStory";
import AboutBenefits from "./components/AboutBenefits";
import AboutStats from "./components/AboutStats";
import AboutCta from "./components/AboutCta";

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
