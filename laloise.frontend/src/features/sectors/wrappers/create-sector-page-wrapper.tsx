import AppFormPageLayout from "@/shared/components/layouts/form-page-layout/app-form-layout";
import sectorImgSrc from "@/shared/assets/sector-icon.svg";
import CreateSectorClientWrapper from "@/features/sectors/wrappers/create-sector-client-wrapper";

export default function CreateSectorPageWrapper() {
  return (
    <AppFormPageLayout
      cardTitle="Novo Setor"
      cardDescription="Preencha as informações para criar um novo setor"
      cardImgSrc={sectorImgSrc}
    >
      <CreateSectorClientWrapper />
    </AppFormPageLayout>
  );
}
