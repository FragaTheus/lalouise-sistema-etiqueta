import { Filter, Search } from "lucide-react";
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
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar por nome ou email..." className="pl-10" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <Filter />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Todos
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Ativo
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Inativo
            </DropdownMenuItem>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
  );
}
