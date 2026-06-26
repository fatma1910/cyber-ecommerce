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

  const t = useTranslations("products.card");

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleWishlistToggle = () => {
    toggleWishlist(product);

    if (isWishlisted) {
      toast.error(t("removedFromWishlist"));
    } else {
      toast.success(t("addedToWishlist"));
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
        toast.error("Please select all options first.");
        return;
      }
    }

    addToCart(product, selectedVariants);

    toast.success(t("addedToCart"));
  };

  return (
    <section className="padding flex flex-col items-center gap-10 md:flex-row md:gap-4">
      {/* Images */}
      <div className="flex flex-1 gap-12">
        <div className="flex flex-col gap-5">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActive(image.url)}
            
            >
              <Image
                src={image.url}
                alt={product.name}
                width={80}
                height={80}
                className={`h-20 w-20 object-contain transition cursor-pointer
                  ${
                    active === image.url
                      ? "opacity-100"
                      : "opacity-40 hover:opacity-100"
                  }`}
              />
            </button>
          ))}
        </div>
        <div>
        <Image
          src={active}
          alt={product.name}
          width={400}
          height={516}
          className="h-[516px] w-full object-contain"
        />
        </div>
      </div>
      

      {/* Details */}
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="text-4xl font-bold">
          {product.name}
        </h1>

        <div className="flex gap-4 items-center">
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

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="w-1/2 py-6 cursor-pointer"
            onClick={handleWishlistToggle}
          >
            {isWishlisted
              ? "Remove from Wishlist"
              : "Add to Wishlist"}
          </Button>

          <Button
            className="w-1/2 py-6 cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
        <div className="flex item-center gap-6 justify-between ">
            {productDetailsGrid.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div className="p-[16px] rounded-[11px] bg-[#F6F6F6] ">
                        {item.icon}
                    </div>
                    
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-500">{item.title}</p>
                        <p className="text-sm ">{item.description}</p>
                    </div>

                </div>
            ))}
                
            
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;