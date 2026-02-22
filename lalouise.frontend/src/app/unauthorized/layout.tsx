export default function UnauthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-svh w-full flex items-center justify-center">
      {children}
    </main>
  );
}
