import Image from "next/image";
import sushiIcon from "@/assets/login-icon.svg";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-svh w-full grid grid-cols-1 md:grid-cols-2 absolute inset-0">
      <div className="h-full w-full flex items-center justify-center p-8 md:p-12">
        {children}
      </div>
      <div className="h-full w-full hidden md:block">
        <Image
          src={sushiIcon}
          alt="Chefe de cozinha fazendo sushi"
          className="h-full w-full"
          loading="lazy"
        />
      </div>
    </main>
  );
}
