import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function AppListHeader() {
  return (
    <div className="w-full bg-card p-4 items-center flex fixed border-b gap-2">
      <div className="relative flex-1 max-w-sm lg:max-w-xl group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
        <Input placeholder="Buscar por nome ou email..." className="pl-10" />
      </div>
    </div>
  );
}
