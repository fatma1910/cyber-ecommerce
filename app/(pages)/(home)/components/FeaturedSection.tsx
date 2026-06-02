import { productsSection } from "@/lib/constant";
import HomeCard from "./HomeCard";
import { HomeCardProps } from "@/lib/types";

const FeaturedSection = () => {
  return (
    <section className="grid grid-cols-4 ">
      {productsSection.map((item, index) => (
        <HomeCard {...(item as HomeCardProps)} key={index} />
      ))}
    </section>
  );
};

export default FeaturedSection;
