import AppImageCard from "../../app-image-card/app-image-card";
import AppRouterBack from "../../app-router-back";
import { AppFormPageLayoutProps } from "./app-form-layout-data";

export default function AppFormLayout({
  cardImgSrc,
  cardTitle,
  cardDescription,
  children,
}: AppFormPageLayoutProps) {
  return (
    <div className="flex-1 px-4 py-2 lg:p-12 items-center justify-center flex flex-col w-full">
      <AppImageCard
        imgSrc={cardImgSrc}
        description={cardDescription}
        title={cardTitle}
      >
        {children}
      </AppImageCard>
    </div>
  );
}
