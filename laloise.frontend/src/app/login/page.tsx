import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import login from "@/assets/login.svg";
import { FieldSeparator } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import LoginClient from "@/wrapper/login-client";

export default function Login() {
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2 transition-all">
      <div className="flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Bem-vindo de volta!</CardTitle>
          <CardDescription>Insira seus dados para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginClient />
        </CardContent>
        <FieldSeparator>Está com dificuldades?</FieldSeparator>
        <CardFooter className="flex justify-center">
          <Button variant="link">Fale com nosso suporte</Button>
        </CardFooter>
      </div>
      <Image alt="Lalouise" src={login} className="hidden lg:block" />
    </Card>
  );
}
