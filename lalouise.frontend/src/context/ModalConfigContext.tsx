"use client";

import { createContext, useContext, useState } from "react";

interface IModalConfigContext {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const ModalConfigContext = createContext<IModalConfigContext | undefined>(
  undefined,
);

export function ModalConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ModalConfigContext.Provider value={{ isOpen, toggleDrawer }}>
      {children}
    </ModalConfigContext.Provider>
  );
}

export default function useModalConfigContext() {
  const context = useContext(ModalConfigContext);
  if (!context) {
    throw new Error(
      "useModalConfigContext deve ser usado dentro de um ModalConfigProvider",
    );
  }
  return context;
}
