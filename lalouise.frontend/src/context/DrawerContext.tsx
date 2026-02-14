"use client";

import { createContext, useContext, useState } from "react";

interface IDrawerContext {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<IDrawerContext | undefined>(undefined);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}

export default function useDrawerContext() {
  return useContext(DrawerContext);
}
