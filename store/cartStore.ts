import { Product } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem extends Product {
  quantity: number;
  selectedVariants: Record<string, string>;
}

interface CartStore {
  cartItems: CartItem[];

  addToCart: (
    product: Product,
    selectedVariants: Record<string, string>
  ) => void;

  decreaseQuantity: (
    id: string,
    selectedVariants: Record<string, string>
  ) => void;

  removeFromCart: (
    id: string,
    selectedVariants: Record<string, string>
  ) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product, selectedVariants) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) =>
              item.id === product.id &&
              JSON.stringify(item.selectedVariants) ===
                JSON.stringify(selectedVariants)
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id &&
                JSON.stringify(item.selectedVariants) ===
                  JSON.stringify(selectedVariants)
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
            };
          }

          return {
            cartItems: [
              ...state.cartItems,
              {
                ...product,
                quantity: 1,
                selectedVariants,
              },
            ],
          };
        }),

      decreaseQuantity: (id, selectedVariants) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id &&
              JSON.stringify(item.selectedVariants) ===
                JSON.stringify(selectedVariants)
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      removeFromCart: (id, selectedVariants) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) =>
              !(
                item.id === id &&
                JSON.stringify(item.selectedVariants) ===
                  JSON.stringify(selectedVariants)
              )
          ),
        })),

      clearCart: () =>
        set({
          cartItems: [],
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);