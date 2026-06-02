
import Categories from "./components/Categories";
import Devices from "./components/Devices";
import DiscountSection from "./components/DiscountSection";
import FeaturedProducts from "./components/FeaturedProducts";
import FeaturedSection from "./components/FeaturedSection";
import Hero from "./components/Hero";
import SaleSection from "./components/SaleSection";


export default async function Home() {
  return (
      <div>
        <Hero/>
        <Devices/>
        <Categories/>
        <FeaturedProducts/>
        <FeaturedSection/>
        <DiscountSection/>
        <SaleSection/>
    </div>
  );
}
