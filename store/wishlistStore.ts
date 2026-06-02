import { Product } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      wishlist: [],

      toggleWishlist: (product: Product) =>
        set((state) => {
          const isInWishlist = state.wishlist.some(
            (item) => item.id === product.id
          );

          if (isInWishlist) {
            return {
              wishlist: state.wishlist.filter(
                (item) => item.id !== product.id
              ),
            };
          }

          return {
            wishlist: [...state.wishlist, product],
          };
        }),
    }),
    {
      name: "wishlist-storage", 
    }
  )
);