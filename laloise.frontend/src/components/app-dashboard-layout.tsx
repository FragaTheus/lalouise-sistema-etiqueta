interface DashboardPageLayoutProps {
  children: React.ReactNode;
}

export default function AppDashboardLayout({
  children,
}: DashboardPageLayoutProps) {
  return (
    <div className="flex-1 overflow-auto flex items-center justify-center p-4 lg:p-8 mt-12 lg:mt-0">
      {children}
    </div>
  );
}
