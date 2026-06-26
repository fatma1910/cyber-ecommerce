"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/components/shared/Card";

import { getProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import CardSkeleton from "@/components/shared/CardSkeleton";

const GetProducts = ({ type }: { type: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Cache
  const cache = useRef<Record<string, Product[]>>({});

  useEffect(() => {

    if (cache.current[type]) {
      setProducts(cache.current[type]);
      setLoading(false);
      return;
    }

    const loadProducts = async () => {
      setLoading(true);

      try {
        const data = await getProducts({
          page: 1,
          pageSize: 20,
          q: "",
          categoryId: "",
          type,
        });

        cache.current[type] = data;
        setProducts(data);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [type]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
};

export default GetProducts;