import { Filter, PlusIcon, Search, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Toggle } from "../ui/toggle";

export default function AppListPageLayoutHeader() {
  return (
    <div className="fixed w-full max-h-min flex flex-col ">
      <div className=" flex py-2 px-4 border-b bg-card">
        <div className="relative flex items-center justify-start w-full max-w-xl gap-2">
          <Search className="size-4 text-primary left-3 absolute" />
          <Input
            placeholder="Digite um termo para buscar..."
            className="pl-8 w-full"
          />
          <Link href={""}>
            <Button className="bg-transparent hover:bg-primary/5 active:bg-primary/10 text-primary cursor-pointer flex items-center justify-center">
              <PlusIcon />
              <span>Novo</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="py-2 px-4 overflow-x-auto inline-flex gap-2 no-scrollbar ">
        {filters.map((filter, i) => (
          <Toggle
            key={filter}
            className="rounded-full bg-transparent border border-gray-300 text-muted-foreground cursor-pointer hover:bg-primary/5 data-[state=on]:bg-primary/20 data-[state=on]:text-primary data-[state=on]:border-primary p-2 inline-flex group/filter shrink-0"
          >
            <Filter className="size-4" />
            <small>Filtro</small>
            <XIcon className="hidden group-data-[state=on]/filter:inline" />
          </Toggle>
        ))}
      </div>
    </div>
  );
}

const filters = [1, 2, 3, 4, 5, 6];
