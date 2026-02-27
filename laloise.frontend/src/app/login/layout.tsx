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
      <div id="content" className="w-full max-w-sm lg:max-w-4xl flex flex-col">
        {children}
      </div>
    </main>
  );
}
