"use client";

import { Button } from "@/components/ui/button";
import { productDetailsGrid } from "@/lib/constant";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetails = ({ product }: { product: Product }) => {
  const [active, setActive] = useState(product.images[0].url);

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const { wishlist, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const t = useTranslations("products.detail");
  const cardT = useTranslations("products.card");

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleWishlistToggle = () => {
    toggleWishlist(product);

    if (isWishlisted) {
      toast.error(cardT("removedFromWishlist"));
    } else {
      toast.success(cardT("addedToWishlist"));
    }
  };

  const handleSelectVariant = (
    variantName: string,
    value: string
  ) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: value,
    }));
  };

  const handleAddToCart = () => {
    if (product.variants.length > 0) {
      const allSelected = product.variants.every(
        (variant) => selectedVariants[variant.name]
      );

      if (!allSelected) {
        toast.error(t("selectAllOptions"));
        return;
      }
    }

    addToCart(product, selectedVariants);

    toast.success(cardT("addedToCart"));
  };

  return (
    <section className="padding flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-12">
        <div className="grid grid-cols-4 gap-3 lg:flex lg:flex-col">
          {product.images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(image.url)}
              className="overflow-hidden rounded-xl"
            >
              <Image
                src={image.url}
                alt={product.name}
                width={80}
                height={80}
                className={`h-16 w-full object-contain transition sm:h-20 sm:w-20 ${
                  active === image.url
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-100"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 justify-center">
          <Image
            src={active}
            alt={product.name}
            width={400}
            height={516}
            className="h-auto w-full max-w-[420px] object-contain sm:max-w-[520px] lg:h-[516px] lg:max-w-none"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <h1 className="text-3xl font-bold sm:text-4xl">
          {product.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-2xl">
            ${product.salePrice}
          </p>

          <p className="text-2xl line-through text-gray-400">
            ${product.price}
          </p>
        </div>

        {product.variants.length > 0 && (
          <div className="flex flex-col gap-5">
            {product.variants.map((variant) => (
              <div key={variant.id}>
                <p className="mb-2 font-medium">
                  {variant.name}
                </p>

                <div className="flex flex-wrap gap-3">
                  {variant.values.map((value) => {
                    const selected =
                      selectedVariants[variant.name] ===
                      value.value;

                    return (
                      <button
                        key={value.id}
                        onClick={() =>
                          handleSelectVariant(
                            variant.name,
                            value.value
                          )
                        }
                        className={`rounded-lg border px-4 py-2 transition cursor-pointer
                          ${
                            selected
                              ? "bg-black text-white border-black"
                              : "border-gray-300 hover:border-black"
                          }`}
                      >
                        {value.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-gray-600">
          {product.description}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            variant="outline"
            className="w-full py-6 cursor-pointer sm:w-1/2"
            onClick={handleWishlistToggle}
          >
            {isWishlisted
              ? t("removeFromWishlist")
              : t("addToWishlist")}
          </Button>

          <Button
            className="w-full py-6 cursor-pointer sm:w-1/2"
            onClick={handleAddToCart}
          >
            {t("addToCart")}
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
            {productDetailsGrid.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div className="rounded-[11px] bg-[#F6F6F6] p-4">
                        {item.icon}
                    </div>
                    
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-500">{t(`meta.${item.key}Title`)}</p>
                        <p className="text-sm ">{t(`meta.${item.key}Description`)}</p>
                    </div>

                </div>
            ))}
                
            
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
