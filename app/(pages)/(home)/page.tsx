
import Categories from "./components/Categories";
import Devices from "./components/Devices";
import FeaturedProducts from "./components/FeaturedProducts";
import Hero from "./components/Hero";


export default async function Home() {
  return (
      <div>
        <Hero/>
        <Devices/>
        <Categories/>
        <FeaturedProducts/>
    </div>
  );
}
