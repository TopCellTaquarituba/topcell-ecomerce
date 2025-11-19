import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CommerceProduct } from "@/lib/data";

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image?: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: CommerceProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const findItemIndex = (items: CartItem[], productId: string) =>
  items.findIndex((item) => item.id === productId);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingIndex = findItemIndex(state.items, product.id);
          if (existingIndex >= 0) {
            const items = [...state.items];
            items[existingIndex] = {
              ...items[existingIndex],
              quantity: Math.min(99, items[existingIndex].quantity + quantity),
            };
            return { items };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
                quantity,
              },
            ],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "topcell-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const useCartTotals = () => {
  const items = useCart((state) => state.items);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  return { totalQuantity, totalPrice };
};
