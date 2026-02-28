import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="w-full grid grid-cols-12 px-8 py-2 items-center justify-self-center h-auto fixed">
      <div className="col-span-9 lg:col-span-10">
        {
          //<Image src={logo} alt="" />
        }
      </div>
      <div className="flex items-center justify-center">
        <Button className="group bg-card">
          <MenuIcon className="text-primary group-hover:text-white" />
        </Button>
      </div>
    </header>
  );
}
