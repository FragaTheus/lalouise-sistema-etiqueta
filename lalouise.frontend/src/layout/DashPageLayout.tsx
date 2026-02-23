interface DashPageLayoutProps {
  children: React.ReactNode[];
}

export default function DashPageLayout({ children }: DashPageLayoutProps) {
  return (
    <div className="flex-1 overflow-auto mt-15 mb-18 lg:grid gap-4 p-4 lg:mt-0 lg:mb-0 lg:grid-cols-3 lg:grid-rows-3 lg:p-12">
      {children}
    </div>
  );
}
