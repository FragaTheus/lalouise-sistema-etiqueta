import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FieldSeparator } from "../ui/field";
import { Button } from "../ui/button";
import Image from "next/image";
import { AppImageCardProps } from "./app-image-card-type";
import {
  SlideInFromLeft,
  SlideInFromRight,
  FadeIn,
} from "@/animations/animations";
import AppRouterBack from "../app-router-back";

export default function AppImageCard({
  title,
  description,
  children,
  imgSrc,
  help,
  separator,
}: AppImageCardProps) {
  return (
    <SlideInFromLeft delay={0}>
      <Card className="w-full grid grid-cols-1 lg:grid-cols-2 transition-all max-w-sm lg:max-w-7xl border-0 shadow-md hover:shadow-lg duration-300 bg-linear-to-b from-primary/5 to-transparent mt-10 lg:mt-0 min-w-xs">
        <div className="flex flex-col gap-6">
          {title && (
            <SlideInFromLeft delay={0.1}>
              <CardHeader>
                <AppRouterBack />
                <CardTitle className="text-2xl text-foreground">
                  {title}
                </CardTitle>
                <CardDescription className="text-foreground/70">
                  {description}
                </CardDescription>
              </CardHeader>
            </SlideInFromLeft>
          )}
          <SlideInFromLeft delay={0.2}>
            <CardContent>{children}</CardContent>
          </SlideInFromLeft>
          {help && (
            <FadeIn delay={0.3}>
              <FieldSeparator className="mt-2">{separator}</FieldSeparator>
              <CardFooter className="flex justify-center pt-8">
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {help}
                </Button>
              </CardFooter>
            </FadeIn>
          )}
        </div>
        <SlideInFromRight delay={0.1}>
          <div className="hidden lg:block">
            <Image
              alt="Lalouise"
              src={imgSrc}
              className="h-full object-cover drop-shadow-sm"
            />
          </div>
        </SlideInFromRight>
      </Card>
    </SlideInFromLeft>
  );
}
