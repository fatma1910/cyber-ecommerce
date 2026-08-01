import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Categories from "./components/Categories";
import Devices from "./components/Devices";
import DiscountSection from "./components/DiscountSection";
import FeaturedProducts from "./components/FeaturedProducts";
import FeaturedSection from "./components/FeaturedSection";
import Hero from "./components/Hero";
import SaleSection from "./components/SaleSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.home");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <Devices />
      <Categories />
      <FeaturedProducts />
      <FeaturedSection />
      <DiscountSection />
      <SaleSection />
    </div>
  );
}
