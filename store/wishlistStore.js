import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Toggle wishlist
      toggleWishlist: (product) => {
        const items = get().items;
        const exists = items.find((i) => i.slug === product.slug);
        if (exists) {
          set({ items: items.filter((i) => i.slug !== product.slug) });
        } else {
          set({ items: [...items, product] });
        }
      },

      // Check if item is wishlisted
      isWishlisted: (slug) => get().items.some((i) => i.slug === slug),

      // Remove from wishlist
      removeFromWishlist: (slug) => {
        set({ items: get().items.filter((i) => i.slug !== slug) });
      },

      // Clear wishlist
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "velyscent-wishlist", // saves to localStorage
    }
  )
);