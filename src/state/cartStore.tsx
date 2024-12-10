import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface CartItem {
  id: string | number;
  item: any;
  count: number;
}

interface CartStore {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  getItemCount: (id: string | number) => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (item) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          (cartItem) => cartItem?.id === item?.id
        );
        if (existingItemIndex >= 0) {
          const updatedCart = [...currentCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            count: updatedCart[existingItemIndex].count + 1,
          };
          set({ cart: updatedCart });
        } else {
          set({
            cart: [
              ...currentCart,
              { id: item?.id, item: item, count: 1 },
            ],
          });
        }
      },
      removeItem: (id) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          (cartItem) => cartItem?.id === id
        );

        if (existingItemIndex >= 0) {
          const updatedCart = [...currentCart];
          const existingItem = updatedCart[existingItemIndex];

          if (existingItem.count > 1) {
            updatedCart[existingItemIndex] = {
              ...existingItem,
              count: existingItem.count - 1,
            };
          } else {
            updatedCart.splice(existingItemIndex, 1);
          }
          set({ cart: updatedCart });
        }
      },
      clearCart: () => set({ cart: [] }),
      getItemCount: (id) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find(
          (cartItem) => cartItem?.id === id
        );
        return existingItem ? existingItem.count : 0;
      },
      getTotalPrice: () => {
        const currentCart = get().cart;
        return currentCart.reduce(
          (total, cartItem) => total + cartItem.item.price * cartItem.count,
          0
        );
      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
