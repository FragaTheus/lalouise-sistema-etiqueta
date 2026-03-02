"use client";

import AppImageCard from "@/components/app-image-card";
import createUser from "@/assets/create-user.svg";
import CreateUserClient from "@/wrapper/create-user-client";
import AppDashboardLayout from "@/components/app-dashboard-layout";

export default function CreateUser() {
  return (
    <AppDashboardLayout>
      <AppImageCard
        title="Cadastrar Usuário"
        description="Insira os dados do novo usuário"
        imgSrc={createUser}
      >
        <CreateUserClient />
      </AppImageCard>
    </AppDashboardLayout>
  );
}
