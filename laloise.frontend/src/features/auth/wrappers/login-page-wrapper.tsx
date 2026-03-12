import login from "@/shared/assets/login.svg";
import AppImageCard from "@/shared/components/app-image-card/app-image-card";
import textContent from "@/features/auth/constants/loginTextContent.json";
import LoginClientWrapper from "./login-client-wrapper";

export default function LoginPageWrapper() {
  return (
    <AppImageCard
      title={textContent.login.page.title}
      description={textContent.login.page.description}
      imgSrc={login}
      separator={textContent.login.page.separator}
      help={textContent.login.page.help}
    >
      <LoginClientWrapper />
    </AppImageCard>
  );
}
