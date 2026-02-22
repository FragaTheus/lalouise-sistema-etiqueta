import DashboardTitle from "@/components/DashboardTitle";

export default function Dashboard() {
  return (
    <div id="dashboard-page" className="flex-1 grid grid-rows-6">
      <DashboardTitle />
      <div id="dashboard-content" className="bg-amber-500 row-span-5"></div>
    </div>
  );
}
