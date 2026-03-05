import AppListHeader from "@/components/app-list-layou/app-list-header";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { MoreHorizontal, UserIcon } from "lucide-react";

export default function Accounts() {
  return (
    <div className="mt-17 flex-1 lg:mt-0 flex flex-col">
      <AppListHeader />
      <div className="flex-1 grid grid-cols-1 auto-rows-auto overflow-auto gap-2 px-4 mt-18 mb-16">
        {index2.map((i, index) => (
          <Card key={i} className="w-full flex items-center">
            <CardContent className="flex items-center justify-between w-full h-full">
              <div className="flex gap-2 items-center flex-1">
                <UserIcon className="text-primary h-15 w-15" />
                <div className="flex flex-col lg:flex-row justify-evenly items-start w-full">
                  <small>Item</small>
                  <small>Item</small>
                  <small>Item</small>
                  <small>Item</small>
                </div>
              </div>

              <CardAction className="self-center">
                <Button className="bg-transparent text-primary hover:bg-primary/5 active:bg-primary/10 cursor-pointer">
                  <MoreHorizontal />
                </Button>
              </CardAction>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="w-full bg-card min-h-max fixed bottom-0 border-t p-4 items-center justify-center flex">
        Paginacao
      </div>
    </div>
  );
}

const index = [1, 2, 3];

const index2 = [1, 2, 3, 4, 5, 6, 7, 8];
