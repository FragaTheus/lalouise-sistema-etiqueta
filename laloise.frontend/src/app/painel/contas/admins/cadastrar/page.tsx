import AppDashboardLayout from "@/components/app-dashboard-layout";
import AppImageCard from "@/components/app-image-card";
import createAdmin from "@/assets/create-admin.svg";
import CreateAdminClient from "@/wrapper/create-admin-client";

export default function RegisterAadmin() {
  return (
    <AppDashboardLayout>
      <AppImageCard
        title="Cadastrar Administrador"
        description="Insira os dados do novo Administrador"
        imgSrc={createAdmin}
      >
        <CreateAdminClient />
      </AppImageCard>
    </AppDashboardLayout>
  );
}
