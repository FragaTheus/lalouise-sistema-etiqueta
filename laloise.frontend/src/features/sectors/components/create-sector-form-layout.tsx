import AppImageCard from "@/shared/components/app-image-card/app-image-card";
import sectorImgSrc from "@/shared/assets/sector-icon.svg";

interface CreateSectorFormLayoutProps {
  children: React.ReactNode;
}

export default function CreateSectorFormLayout({
  children,
}: CreateSectorFormLayoutProps) {
  return (
    <div className="flex-1 px-4 py-2 lg:p-12 items-center justify-center flex flex-col w-full mt-8 lg:mt-0">
      <AppImageCard
        title="Novo Setor"
        description="Preencha as informações para criar um novo setor"
        imgSrc={sectorImgSrc}
      >
        {children}
      </AppImageCard>
    </div>
  );
}
