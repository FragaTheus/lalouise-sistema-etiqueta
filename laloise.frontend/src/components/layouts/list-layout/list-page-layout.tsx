import AppRouterBack from "@/components/app-router-back";
import { Card } from "@/components/ui/card";

import ListLayoutHeader from "./list-layout-header";
import { ListLayoutHeaderProps } from "./list-layout-data";

export default function ListPageLayout({
  createHref,
  filterOptions = [],
}: ListLayoutHeaderProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-h-min max-w-7xl w-full">
        <AppRouterBack />
        <Card>
          <ListLayoutHeader
            createHref={createHref}
            filterOptions={filterOptions}
            placeholder="Busque por nome ou email"
          />
        </Card>
      </div>
    </div>
  );
}
