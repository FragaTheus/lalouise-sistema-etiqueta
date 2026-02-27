import login from "@/assets/login.svg";
import LoginClient from "@/wrapper/login-client";
import AppImageCard from "@/components/app-image-card";
import textContent from "@/constants/loginTextContent.json";

export default function Login() {
  return (
    <AppImageCard
      title={textContent.login.page.title}
      description={textContent.login.page.description}
      imgSrc={login}
      separator={textContent.login.page.separator}
      help={textContent.login.page.help}
    >
      <LoginClient />
    </AppImageCard>
  );
}
