import AppDashboardLayout from "@/shared/components/layouts/app-dashboard-layout/app-dashboard-layout";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { dashboardCardProps } from "@/features/dashboard/constants/dashboard-cards-props";
import { StaggerContainer, StaggerItem } from "@/shared/animations/animations";

export default function Dashboard() {
  return (
    <AppDashboardLayout>
      <StaggerContainer staggerDelay={0.12}>
        <div className="flex-1 grid grid-cols-1 auto-rows-auto lg:grid-cols-3 h-full gap-6 lg:gap-8">
          {dashboardCardProps.map((cards, index) => (
            <StaggerItem key={index}>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg hover:border-primary/20 transition-all duration-300 bg-linear-to-b from-primary/5 to-transparent">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-foreground">
                    {cards.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    {cards.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex items-center justify-center py-8">
                  <div className="relative w-full h-48 flex items-center justify-center">
                    <Image
                      src={cards.srcUrl}
                      alt={cards.title}
                      fill
                      className="object-contain pointer-events-none filter drop-shadow-sm"
                    />
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-border/50">
                  <Link href={cards.link} className="w-full">
                    <Button className="w-full bg-linear-to-r from-primary to-primary/80 text-white hover:shadow-md hover:from-primary/90 hover:to-primary/70 transition-all duration-300 group font-semibold">
                      <span>Gerenciar</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </AppDashboardLayout>
  );
}
