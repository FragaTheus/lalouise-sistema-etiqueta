import InfoMainContentCard, {
  InfoMainContentCardProps,
} from "./info-main-content-card";
import PerfilCard, { PerfilCardProps } from "./info-page-perfil-card";

interface AppInfoPageLayoutProps {
  title: string;
  isPerfil: boolean;
  userInfo: PerfilCardProps;
  infoMainContent: InfoMainContentCardProps;
}

export default function AppInfoPageLayout({
  title,
  isPerfil,
  userInfo,
  infoMainContent,
}: AppInfoPageLayoutProps) {
  return (
    <div className="flex-1 p-4 lg:p-12 flex items-center justify-center">
      <div className="flex flex-col items-start justify-center w-full max-w-sm lg:max-w-2xl gap-2 mt-15 lg:mt-0">
        <h1>{title}</h1>

        {isPerfil && (
          <PerfilCard
            nickname={userInfo.nickname}
            role={userInfo.email}
            email={userInfo.role}
          />
        )}

        <InfoMainContentCard
          title={infoMainContent.title}
          fields={infoMainContent.fields}
        />
      </div>
    </div>
  );
}
