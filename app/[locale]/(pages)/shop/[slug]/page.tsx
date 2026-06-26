import BreadCrumb from "@/components/shared/BreadCrumb";
import { getProductDetails } from "@/lib/data";
import { Product } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import ProductDetails from "./components/ProductDetails";

const page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const t = await getTranslations("productPage");
  const { slug } = await params
  const product:Product = await getProductDetails(slug)
  return (
    <div className="">
      <div className="padding-x py-4 sm:py-10">
        <BreadCrumb category={product.categories[0].category.name} productName={product.name} />
      </div>
      <ProductDetails product={product} />
      {/* <h1 className="text-3xl font-semibold">{product.name}</h1>
      <p className="mt-2 text-sm text-gray-500">{t("description")}</p> */}
    </div>
  );
};

export default page;
