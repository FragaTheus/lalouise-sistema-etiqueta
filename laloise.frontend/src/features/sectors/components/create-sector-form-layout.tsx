import AppImageCard from "@/shared/components/app-image-card/app-image-card";
import sectorImgSrc from "@/shared/assets/sector-icon.svg";

interface CreateSectorFormLayoutProps {
  children: React.ReactNode;
}

export default function CreateSectorFormLayout({
  children,
}: CreateSectorFormLayoutProps) {
  return (
    <div className="flex-1 px-4 py-3 lg:p-8 items-center justify-center flex flex-col w-full mt-10 mb-4 lg:mt-0">
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
