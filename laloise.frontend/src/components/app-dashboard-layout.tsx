interface DashboardPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AppDashboardLayout({
  title,
  description,
  children,
}: DashboardPageLayoutProps) {
  return (
    <div className="flex-1 order-first lg:order-last overflow-auto p-4 lg:p-12 gap-2">
      <div className="mb-2 lg:mb-8">
        <h1 className="text-secondary">{title}</h1>
        <small className="text-muted-foreground">{description}</small>
      </div>
      {children}
    </div>
  );
}
