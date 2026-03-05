import AppImageCard from "../app-image-card";
import AppFormPageLayoutRouterBack from "./app-form-page-layout-router-back";

interface AppFormPageLayoutProps {
  cardImgSrc: string;
  cardTitle: string;
  cardDescription: string;
  children: React.ReactNode;
}

export default function AppFormPageLayout({
  cardImgSrc,
  cardTitle,
  cardDescription,
  children,
}: AppFormPageLayoutProps) {
  return (
    <>
      <div className="flex-1 px-4 py-2 lg:p-12 items-center justify-center flex lg:mt-0 flex-col">
        <AppFormPageLayoutRouterBack />
        <AppImageCard
          imgSrc={cardImgSrc}
          description={cardDescription}
          title={cardTitle}
        >
          {children}
        </AppImageCard>
      </div>
    </>
  );
}
