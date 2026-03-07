import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppListLoadingCard() {
  return (
    <Card className="-z-10">
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-1 lg:gap-4 w-full ">
          <div className="flex flex-1 overflow-hidden lg:flex-row justify-evenly  gap-5 items-center">
            <Skeleton className="bg-muted rounded-full h-10 w-20" />
            <div className="w-full flex-col gap-4 flex">
              <Skeleton className="bg-muted rounded-sm w-1/4 h-4" />
              <Skeleton className="bg-muted rounded-sm w-2/3 h-4" />
              <Skeleton className="bg-muted rounded-sm w-1/2 h-4" />
            </div>
            <Skeleton className="bg-muted rounded-sm h-10 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
