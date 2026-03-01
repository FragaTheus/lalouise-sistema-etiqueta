import DashboardPageLayout from "@/components/app-dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { accountCardProps } from "@/constants/accountCardProps";
import Link from "next/link";

export default function Accounts() {
  return (
    <DashboardPageLayout>
      <div className="grid gap-4 lg:grid-cols-3 auto-rows-auto">
        {accountCardProps.map((card, i) => (
          <Link href={card.href} key={i}>
            <Card className="hover:scale-101 active:scale-98 transition-all">
              <CardHeader>
                <card.Icon className="text-primary" />
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>{card.children}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardPageLayout>
  );
}
