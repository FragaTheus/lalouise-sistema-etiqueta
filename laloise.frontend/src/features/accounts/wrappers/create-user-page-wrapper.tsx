import AppFormPageLayout from "@/shared/components/layouts/form-page-layout/app-form-layout";
import createUserImgSrc from "@/shared/assets/create-user.svg";
import CreateUserClientWrapper from "./create-user-client-wrapper";

export default function CreateUserPageWrapper() {
  return (
    <AppFormPageLayout
      cardTitle="Novo Usuário"
      cardDescription="Preencha as informações para criar uma nova conta de usuário"
      cardImgSrc={createUserImgSrc}
    >
      <CreateUserClientWrapper />
    </AppFormPageLayout>
  );
}
