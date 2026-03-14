import { SectorInfo } from "@/features/sectors/api/api.sectors.data";
import SectorDetailsCard from "@/features/sectors/components/sector-details-card";
import AppRouterBack from "@/shared/components/app-router-back";

interface CardDetailsLayoutProps {
  sector: SectorInfo;
  children?: React.ReactNode;
}

export default function CardDetailsLayout({
  sector,
  children,
}: CardDetailsLayoutProps) {
  return (
    <div className="flex-1 min-h-svh px-4 py-3 pt-20 md:pt-0 flex items-center justify-center flex-col">
      <div className="flex items-start w-full mb-2">
        <AppRouterBack />
      </div>
      <SectorDetailsCard sector={sector}>{children}</SectorDetailsCard>
    </div>
  );
}
