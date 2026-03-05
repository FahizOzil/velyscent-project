import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart
      addToCart: (product) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.slug === product.slug && i.variant === product.variant
        );
        if (existing) {
          // increase qty if already in cart
          set({
            items: items.map((i) =>
              i.slug === product.slug && i.variant === product.variant
                ? { ...i, qty: i.qty + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, qty: 1 }] });
        }
      },

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