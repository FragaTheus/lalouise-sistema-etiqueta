import { Filter, Search } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function AppListHeader() {
  return (
    <div className="w-full bg-card p-4 items-center flex fixed border-b gap-2">
      <div className="relative flex-1 max-w-sm lg:max-w-xl group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
        <Input placeholder="Buscar por nome ou email..." className="pl-10" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="cursor-pointer bg-transparent hover:bg-primary/5 active:bg-primary/10 data-[state=open]:bg-primary/10">
            <Filter className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            {index.map((index, i) => (
              <Button
                key={i}
                className="cursor-pointer bg-transparent hover:bg-primary/5 active:bg-primary/10 data-[state=open]:bg-primary/10"
              >
                <small className="text-foreground">Filtro</small>
              </Button>
            ))}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const index = [1, 2, 3];
