import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart
     addToCart: (item) => set((state) => {
  const existing = state.items.find(
    (i) => i.slug === item.slug && i.variant === item.variant
  );
  if (existing) {
    return {
      items: state.items.map((i) =>
        i.slug === item.slug && i.variant === item.variant
          ? { ...i, qty: i.qty + item.qty }
          : i
      ),
    };
  }
  return { items: [...state.items, { ...item, image: item.image || "" }] };
}),

      // Remove item
      removeFromCart: (slug, variant) => {
        set({
          items: get().items.filter(
            (i) => !(i.slug === slug && i.variant === variant)
          ),
        });
      },

      // Update qty
      updateQty: (slug, variant, qty) => {
        if (qty < 1) return;
        set({
          items: get().items.map((i) =>
            i.slug === slug && i.variant === variant ? { ...i, qty } : i
          ),
        });
      },

      // Clear cart
      clearCart: () => set({ items: [] }),

      // Total count
      cartCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),

      // Total price
      cartTotal: () =>
        get().items.reduce(
          (sum, i) => sum + parseFloat(i.price) * i.qty, 0
        ),
    }),
    {
      name: "velyscent-cart", // saves to localStorage
    }
  )
);