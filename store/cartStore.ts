import { Product } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];

  addToCart: (product: Product) => void;

  decreaseQuantity: (id: string) => void;

  removeFromCart: (id: string) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
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
              },
            ],
          };
        }),

      decreaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.id !== id
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