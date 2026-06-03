import { getTranslations } from "next-intl/server";
import Card from "@/components/shared/Card";
import { getProducts } from "@/lib/data";
import { Product } from "@/lib/types";

const DiscountSection = async () => {
  const t = await getTranslations("home.discounts");
  const data = await getProducts({
    page: 1,
    pageSize: 4,
    q: "",
    categoryId: "",
  });

  const discountedProducts = data.filter(
    (product: Product) => product.salePrice && product.salePrice < product.price
  );

  return (
    <section className="padding">
      <h4 className="mb-6 text-2xl font-medium sm:mb-7 sm:text-3xl">
        {t("title")}
      </h4>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {discountedProducts.map((product: Product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default DiscountSection;
