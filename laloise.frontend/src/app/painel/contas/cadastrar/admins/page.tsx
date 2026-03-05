import AppFormPageLayout from "@/components/layouts/app-form-page-layout";
import createAdminImgSrc from "@/assets/create-admin.svg";
import CreateAdminClient from "@/wrapper/create-admin-client";

export default function CreateAdmin() {
  return (
    <AppFormPageLayout
      cardTitle="Novo Administrador"
      cardDescription="Preencha as informações para criar uma nova conta de administrador"
      cardImgSrc={createAdminImgSrc}
    >
      <CreateAdminClient />
    </AppFormPageLayout>
  );
}
