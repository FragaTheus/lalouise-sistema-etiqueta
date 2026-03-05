import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function AppListLayoutHeaderFilter() {
  return (
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
  );
}

const index = [1, 2, 3];
