"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/UserStore";
import MenuPageCard, { IMenuPageCard } from "./MenuPageCards";

type MenuPageLayoutType = {
  cards: IMenuPageCard[];
};

export default function MenuPageLayout({ cards }: MenuPageLayoutType) {
  const user = useAuthStore((state) => state.user);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => unsub();
  }, []);

  if (!hydrated) return null;

  return (
    <div className="flex-1 grid grid-rows-4 p-4 lg:p-12">
      <div className="flex flex-col justify-center items-start">
        <h2>Ola, {user?.nickname}.</h2>
        <h2>Que bom ter voce de volta!</h2>
      </div>

      <div className="row-span-3 grid grid-cols-2 gap-2 lg:gap-2 lg:grid-cols-3 [&>*:nth-child(n+5)]:hidden lg:[&>*:nth-child(n+5)]:grid">
        {cards.map((c, i) => (
          <MenuPageCard
            href={c.href}
            key={i}
            title={c.title}
            subtitle={c.subtitle}
            icon={c.icon}
          >
            {c.children}
          </MenuPageCard>
        ))}
      </div>
    </div>
  );
}
