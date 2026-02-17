import { ChevronRightIcon } from "@heroicons/react/24/outline";
import MenuPageCard, { IMenuPageCard } from "./MenuPageCards";

type MenuPageLayoutType = {
  cards: IMenuPageCard[];
};

export default function MenuPageLayout({ cards }: MenuPageLayoutType) {
  return (
    <div className="flex-1 grid grid-rows-4 p-4 lg:p-12">
      <div className="flex flex-col justify-center items-start">
        <h2>Ola, nome.</h2>
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
