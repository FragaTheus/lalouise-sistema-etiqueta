import { Filter, PlusIcon, Search } from "lucide-react";
import { CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function AppTableHeader() {
  return (
    <CardHeader className="flex justify-between">
      <div className="flex flex-1 max-w-md gap-2">
        <div className="relative flex-1 max-w-lg group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
          <Input placeholder="Buscar por nome ou email..." className="pl-10" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="cursor-pointer hover:bg-primary/5 active:bg-primary/10 text-black hover:text-black active:text-black data-[state=open]:bg-primary/10"
            >
              <Filter />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/5 active:bg-primary/10">
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/5 active:bg-primary/10">
                Ativo
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/5 active:bg-primary/10">
                Inativo
              </DropdownMenuItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button className="active:bg-primary/90 hover:bg-primary/70 cursor-pointer">
        <PlusIcon />
        <span className="hidden md:inline">Cadastrar</span>
      </Button>
    </CardHeader>
  );
}
