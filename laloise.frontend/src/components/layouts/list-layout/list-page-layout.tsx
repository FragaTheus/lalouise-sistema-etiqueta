import AppRouterBack from "@/components/app-router-back";
import { Card } from "@/components/ui/card";
import ListLayoutHeader from "./list-layout-header";
import ListLayoutContent from "./list-layout-content";
import { ListPageLayoutProps } from "./list-layout-data";
import ListLayoutFooter from "./list-layout-footer";

export default function ListPageLayout<T extends { id: string }>({
  createHref,
  placeholder,
  filterParam,
  filterOptions = [],
  data,
  columns,
  totalItems,
  caption,
  actionHref,
}: ListPageLayoutProps<T>) {
  return (
    <div className="flex-1 flex items-center justify-center p-4 pt-10 lg:pt-4">
      <div className="max-h-min max-w-7xl w-full gap-2 flex flex-col pt-4">
        <AppRouterBack />
        <Card>
          <ListLayoutHeader
            createHref={createHref}
            placeholder={placeholder}
            filterParam={filterParam}
            filterOptions={filterOptions}
          />
          <ListLayoutContent
            data={data}
            columns={columns}
            totalItems={totalItems}
            caption={caption}
            actionHref={actionHref}
          />
          <ListLayoutFooter totalItems={totalItems} />
        </Card>
      </div>
    </div>
  );
}
