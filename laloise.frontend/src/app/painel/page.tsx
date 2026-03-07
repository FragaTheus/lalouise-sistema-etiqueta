import AppDashboardLayout from "@/components/layouts/app-dashboard-layout/app-dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { dashboardCardProps } from "@/constants/dashboard-cards-props";

export default function Dashboard() {
  return (
    <AppDashboardLayout>
      <div className="flex-1 grid grid-cols-1 auto-rows-auto lg:grid-cols-3 h-full gap-4 lg:gap-8">
        {dashboardCardProps.map((cards, index) => (
          <Card key={index}>
            <CardContent className="items-center justify-center flex">
              <Image
                src={cards.srcUrl}
                alt="Icone de usuario"
                className="w-full max-w-xs pointer-events-none"
              />
            </CardContent>

            <CardHeader className="order-first lg:order-2">
              <CardTitle>{cards.title}</CardTitle>
              <CardDescription>{cards.description}</CardDescription>
            </CardHeader>

            <CardFooter className="order-last">
              <Link href={cards.link} className="w-full">
                <Button
                  variant={"outline"}
                  className="flex items-center w-full group cursor-pointer"
                >
                  <span>Gerenciar</span>
                  <ChevronRight className="group-hover:ml-1 duration-300 transition-all " />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </AppDashboardLayout>
  );
}
