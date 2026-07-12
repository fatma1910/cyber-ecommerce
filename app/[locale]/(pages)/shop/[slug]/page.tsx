import BreadCrumb from "@/components/shared/BreadCrumb";
import CardSkeleton from "@/components/shared/CardSkeleton";
import { getProductDetails } from "@/lib/data";
import { Product } from "@/lib/types";
import { Suspense } from "react";
import ProductDetails from "./components/ProductDetails";
import ProductDescription from "./components/ProductDescription";
import ProductReviews from "./components/ProductReviews";
import RelatedProducts from "./components/RelatedProducts";

const page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const product:Product = await getProductDetails(slug)
  return (
    <div className="">
      <div className="padding-x py-4 sm:py-10">
        <BreadCrumb category={product.categories[0].category.name} productName={product.name} />
      </div>
      <ProductDetails product={product} />
      <ProductDescription product={product} />
      <ProductReviews productSlug={product.slug} />
      <Suspense
        fallback={
          <section className="padding flex flex-col gap-6">
            <h1 className="font-medium text-[24px]">Related Products</h1>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          </section>
        }
      >
        <RelatedProducts slug={product.slug} />
      </Suspense>
      {/* <h1 className="text-3xl font-semibold">{product.name}</h1>
      <p className="mt-2 text-sm text-gray-500">{t("description")}</p> */}
    </div>
  );
};

export default page;
