'use client'

import Card from "@/components/shared/Card";
import { getProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const GetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const t = useTranslations("home.products");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts({
        page: 1,
        pageSize: 20,
        q: "",
        categoryId: "",
      });

      setProducts(data);
    };

    loadProducts();
  }, []);

  if (products === null) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-8 text-center text-sm text-gray-500">
        {t("unavailable")}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-8 text-center text-sm text-gray-500">
        {t("empty")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
      {products.map((product: Product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
};

export default GetProducts;
