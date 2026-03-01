"use client";

import AppImageCard from "@/components/app-image-card";
import createUser from "@/assets/create-user.svg";
import CreateUserClient from "@/wrapper/create-user-client";
import AppDashboardLayout from "@/components/app-dashboard-layout";

export default function CreateUser() {
  return (
    <AppDashboardLayout>
      <AppImageCard
        title="Cadastrar"
        description="Insira os dados do novo usuario"
        imgSrc={createUser}
      >
        <CreateUserClient />
      </AppImageCard>
    </AppDashboardLayout>
  );
}
