/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import Card from "@/components/shared/Card";
import { getProducts } from "@/lib/data";
import { Product } from "@/lib/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

const PAGE_SIZE = 12;

const ProductsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("shop.products");
  const common = useTranslations("common");

  const page = Number(searchParams.get("page") || "1");

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "default") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key !== "page") {
      params.delete("page");
    }

    router.push(
      params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname
    );
  };

  const handleSortChange = (value: string) => {
    updateQuery("sort", value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    updateQuery("page", String(newPage));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      try {
        const data = await getProducts({
          page,
          pageSize: PAGE_SIZE,
          q: searchParams.get("q") || "",
          categoryId: searchParams.get("categoryId") || "",
          subcategoryId: searchParams.get("subcategoryId") || "",
          type: searchParams.get("type") || "",
          minPrice: Number(searchParams.get("minPrice")) || 0,
          maxPrice: Number(searchParams.get("maxPrice")) || 10000,
          sort: searchParams.get("sort") || "",
        });

        setProducts(data.items ?? []);
        setTotal(data.total ?? 0);
      } catch (err) {
        console.error(err);
        setProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchParams, page]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">
          {t("title")} ({total})
        </h2>

        <Select
          value={searchParams.get("sort") || "default"}
          // @ts-ignore
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder={common("sortBy")} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="default">
              {common("default")}
            </SelectItem>

            <SelectItem value="az">{t("sort.az")}</SelectItem>
            <SelectItem value="za">{t("sort.za")}</SelectItem>
            <SelectItem value="priceAsc">{t("sort.priceAsc")}</SelectItem>
            <SelectItem value="priceDesc">{t("sort.priceDesc")}</SelectItem>
            <SelectItem value="ratingAsc">{t("sort.ratingAsc")}</SelectItem>
            <SelectItem value="ratingDesc">{t("sort.ratingDesc")}</SelectItem>
            <SelectItem value="newest">{t("sort.newest")}</SelectItem>
            <SelectItem value="oldest">{t("sort.oldest")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="py-20 text-center">{t("loading")}</div>
      ) : products.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold">{t("emptyTitle")}</h2>

          <p className="mt-2 text-muted-foreground">
            {t("emptyDescription")}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4  lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                {t("pagination.previous")}
              </Button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;

                return (
                  <Button
                    key={pageNumber}
                    variant={page === pageNumber ? "default" : "outline"}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                {t("pagination.next")}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsSection;
