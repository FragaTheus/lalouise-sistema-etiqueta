import Link from "next/link";

export interface IMenuPageCard {
  icon: React.ElementType;
  children: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
}

export default function MenuPageCard(i: IMenuPageCard) {
  return (
    <Link href={i.href}>
      <div className="rounded-lg grid grid-rows-3 bg-primary/5 p-2 active:scale-95 transition-all lg:p-8 hover:scale-101">
        <div className="row-span-2">
          <div className="h-full w-full grid grid-rows-2">
            <div className="flex items-center justify-start">
              <i.icon className="h-6 text-primary" />
            </div>
            <div>{i.children}</div>
          </div>
        </div>
        <div className="rounded-b-lg flex">
          <div className="flex-1 flex flex-col items-start justify-center">
            <p className="font-bold">{i.title}</p>
            <small className="font-semibold text-gray-600">{i.subtitle}</small>
          </div>
        </div>
      </div>
    </Link>
  );
}
