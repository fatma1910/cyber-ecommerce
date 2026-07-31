/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import Card from "@/components/shared/Card";
import { getProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { usePathname } from "@/i18n/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      try {
        const data = await getProducts({
          page: 1,
          pageSize: 20,
          q: searchParams.get("q") || "",
          categoryId: searchParams.get("categoryId") || "",
          subcategoryId: searchParams.get("subcategoryId") || "",
          type: searchParams.get("type") || "",
          minPrice: Number(searchParams.get("minPrice")) || 0,
          maxPrice: Number(searchParams.get("maxPrice")) || 1000,
          sort: searchParams.get("sort") || "",
        });

        setProducts(data ?? []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-6">
      {/* Sort */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">
              Products 
        </h2>

        <Select
          value={searchParams.get("sort") || "default"}
        // @ts-ignore
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="default">
              Default
            </SelectItem>

            <SelectItem value="az">
              Name (A → Z)
            </SelectItem>

            <SelectItem value="za">
              Name (Z → A)
            </SelectItem>

            <SelectItem value="priceAsc">
              Price (Low → High)
            </SelectItem>

            <SelectItem value="priceDesc">
              Price (High → Low)
            </SelectItem>

            <SelectItem value="ratingAsc">
              Rating (1 → 5)
            </SelectItem>

            <SelectItem value="ratingDesc">
              Rating (5 → 1)
            </SelectItem>

            <SelectItem value="newest">
              Newest
            </SelectItem>

            <SelectItem value="oldest">
              Oldest
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center  ">
          <h2 className="text-xl font-semibold">
            No products found
          </h2>

          <p className="mt-2 text-muted-foreground">
            Try changing your filters or search keywords.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsSection;