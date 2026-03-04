import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FieldSeparator } from "./ui/field";
import { Button } from "./ui/button";
import Image from "next/image";

interface AppImageCardProps {
  title?: string;
  description: string;
  children: React.ReactNode;
  imgSrc: string;
  help?: string;
  separator?: string;
}

export default function AppImageCard({
  title,
  description,
  children,
  imgSrc,
  help,
  separator,
}: AppImageCardProps) {
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2 transition-all max-w-sm lg:max-w-5xl">
      <div className="flex flex-col gap-6">
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
        {help && (
          <>
            <FieldSeparator className="mt-2">{separator}</FieldSeparator>
            <CardFooter className="flex justify-center">
              <Button variant="link">{help}</Button>
            </CardFooter>
          </>
        )}
      </div>
      <Image alt="Lalouise" src={imgSrc} className="hidden lg:block h-full" />
    </Card>
  );
}
