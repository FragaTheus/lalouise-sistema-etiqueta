import AppFormPageLayout from "@/components/layouts/form-page-layout/app-form-page-layout";
import createUserImgSrc from "@/assets/create-user.svg";
import CreateUserClient from "@/wrapper/create-user-client";

export default function CreateUser() {
  return (
    <AppFormPageLayout
      cardTitle="Novo Usuário"
      cardDescription="Preencha as informações para criar uma nova conta de usuário"
      cardImgSrc={createUserImgSrc}
    >
      <CreateUserClient />
    </AppFormPageLayout>
  );
}
