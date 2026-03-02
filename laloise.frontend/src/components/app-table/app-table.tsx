import { Card } from "../ui/card";
import AppTableContent from "./app-table-content";
import AppTableFooter from "./app-table-footer";
import AppTableHeader from "./app-table-header";

export default function AppTable() {
  return (
    <Card className="w-full max-w-sm max-h-138 lg:max-w-5xl">
      <AppTableHeader />
      <AppTableContent />
      <AppTableFooter />
    </Card>
  );
}
