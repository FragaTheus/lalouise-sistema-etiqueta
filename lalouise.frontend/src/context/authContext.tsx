"use client";

import { LoginResponse } from "@/api/api.auht";
import { useAuthStore } from "@/store/UserStore";
import { createContext, useContext, ReactNode } from "react";

interface AuthContextProps {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  setUser: (user: LoginResponse) => void;
  logout: () => void;
  isHydrated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, setUser, clearUser, isHydrated } = useAuthStore();

  const logout = () => {
    clearUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
        logout,
        isHydrated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
