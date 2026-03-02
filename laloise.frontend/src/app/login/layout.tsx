import Image from "next/image";
import logo from "@/assets/logo.png";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      id="login-main"
      className="flex items-center justify-center w-full h-svh p-4 relative"
    >
      <Image
        src={logo}
        alt="LaLouise Logo"
        className="absolute w-40 lg:w-50 left-4 top-2 lg:left-8 z-50 pointer-events-none"
        priority
      />
      <div id="content" className="w-full max-w-sm lg:max-w-4xl flex flex-col">
        {children}
      </div>
    </main>
  );
}
