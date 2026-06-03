import { getTranslations } from "next-intl/server";
import GetCategories from "./GetCategories";

const Categories = async () => {
  const t = await getTranslations("home.categories");

  return (
    <section className="padding bg-[#FAFAFA]">
      <div className="mb-6 sm:mb-8">
        <h4 className="text-2xl font-medium sm:text-3xl">{t("title")}</h4>
      </div>
      <GetCategories />
    </section>
  );
};

export default Categories;
