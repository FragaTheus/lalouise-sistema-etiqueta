import AppDashboardLayout from "@/components/layouts/app-dashboard-layout/app-dashboard-layout";
import AppImageCard from "@/components/app-image-card/app-image-card";
import perfilIcon from "@/assets/perfil-icon.svg";

export default function AccountInfo() {
  return (
    <AppDashboardLayout>
      <AppImageCard
        imgSrc={perfilIcon}
        title="Meu Perfil"
        description="Tudo sobre a sua conta em um só lugar"
      >
        <>Info</>
      </AppImageCard>
    </AppDashboardLayout>
  );
}
