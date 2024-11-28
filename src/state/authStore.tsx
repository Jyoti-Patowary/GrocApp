import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface AuthStore {
  user: Record<string, any> | null;
  setUser: (user: Record<string, any>) => void;
  currentOrder: Record<string, any> | null;
  setCurrentOrder: (order: Record<string, any>) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (data) => set({ user: data }),
      currentOrder: null,
      setCurrentOrder: (order) => set({ currentOrder: order }),
      logOut: () => set({ user: null, currentOrder: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  ),
);
