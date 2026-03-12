import AppFormPageLayout from "@/shared/components/layouts/form-page-layout/app-form-layout";
import createAdminImgSrc from "@/shared/assets/create-admin.svg";
import CreateAdminClientWrapper from "./create-admin-client-wrapper";

export default function CreateAdminPageWrapper() {
  return (
    <AppFormPageLayout
      cardTitle="Novo Administrador"
      cardDescription="Preencha as informações para criar uma nova conta de administrador"
      cardImgSrc={createAdminImgSrc}
    >
      <CreateAdminClientWrapper />
    </AppFormPageLayout>
  );
}
