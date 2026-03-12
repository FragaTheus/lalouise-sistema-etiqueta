interface DashboardPageLayoutProps {
  children: React.ReactNode;
}

export default function AppDashboardLayout({
  children,
}: DashboardPageLayoutProps) {
  return (
    <div className="min-h-screen overflow-auto flex items-center justify-center p-4 lg:px-8 pt-20 lg:p-12">
      {children}
    </div>
  );
}
