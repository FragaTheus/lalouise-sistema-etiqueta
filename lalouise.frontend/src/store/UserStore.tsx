"use client";

import { LoginResponse } from "@/api/api.auht";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: LoginResponse | null;
  setUser: (user: LoginResponse) => void;
  clearUser: () => void;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
    }),
    {
      name: "auth",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
