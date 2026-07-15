import { CartItem, Product } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  cartItems: CartItem[];

  subtotal: () => number;
  tax: () => number;
  total: () => number;

  addToCart: (
    product: Product,
    selectedVariants: Record<string, string>
  ) => void;

  increaseQuantity: (
    id: string,
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

const TAX_RATE = 0.14; 

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      subtotal: () =>
        get().cartItems.reduce(
          (sum, item) => sum + Number(item.price) * item.quantity,
          0
        ),

      tax: () => get().subtotal() * TAX_RATE,

      total: () => get().subtotal() + get().tax(),

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

      increaseQuantity: (id, selectedVariants) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id &&
            JSON.stringify(item.selectedVariants) ===
              JSON.stringify(selectedVariants)
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        })),

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