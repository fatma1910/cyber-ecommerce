import type { Metadata } from "next";
import CardSkeleton from "@/components/shared/CardSkeleton";
import { getProductDetails } from "@/lib/data";
import { Product } from "@/lib/types";
import { Suspense } from "react";
import ProductDetails from "./components/ProductDetails";
import ProductDescription from "./components/ProductDescription";
import ProductReviews from "./components/ProductReviews";
import RelatedProducts from "./components/RelatedProducts";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product: Product = await getProductDetails(slug);
  const t = await getTranslations("metadata.pages.product");
  const description = product.description?.trim() || product.name;

  return {
    title: t("title", { name: product.name }),
    description: t("description", { description }),
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const product:Product = await getProductDetails(slug)
  const t = await getTranslations("products.detail")
  const breadcrumbT = await getTranslations("shop.breadcrumb")
  return (
    <div className="">
      <div className="padding-x py-4 sm:py-10">
        <Breadcrumb>
          <BreadcrumbList className="overflow-x-auto pb-1">
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/">{breadcrumbT("home")}</Link>} />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/shop">{breadcrumbT("shop")}</Link>} />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.categories[0].category.name}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ProductDetails product={product} />
      <ProductDescription product={product} />
      <ProductReviews productSlug={product.slug} />
      <Suspense
        fallback={
          <section className="padding flex flex-col gap-6">
            <h1 className="font-medium text-[24px]">{t("relatedTitle")}</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          </section>
        }
      >
        <RelatedProducts slug={product.slug} />
      </Suspense>
      
    </div>
  );
};

export default page;
