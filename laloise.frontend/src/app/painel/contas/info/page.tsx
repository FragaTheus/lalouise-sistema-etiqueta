import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { PencilIcon, TrashIcon, UserIcon } from "lucide-react";

const PerfilCard = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex">
        <UserIcon className="text-primary w-18 h-18 mr-2" />
        <div className="flex flex-col">
          <span>Matheus</span>
          <span>Admin</span>
          <span>matheusguto1@hotmail.com</span>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoMainContentCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="border-b flex items-center justify-between">
        <CardTitle className="text-primary">Principais informacoes</CardTitle>
        <div className="gap-1 flex">
          <CardAction>
            <Button
              className="cursor-pointer text-primary hover:bg-primary/5 active:bg-primary/10 hover:text-primary active:text-primary"
              variant={"ghost"}
            >
              <PencilIcon />
              <span className="hidden md:block">Editar</span>
            </Button>
          </CardAction>
          <CardAction>
            <Button
              variant={"ghost"}
              className="cursor-pointer text-destructive"
            >
              <TrashIcon />
              <span className="hidden md:block">Exlcuir</span>
            </Button>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-3 auto-rows-auto gap-2">
        {index.map((index, i) => (
          <Field key={index}>
            <FieldLabel>Label</FieldLabel>
            <FieldContent>Content</FieldContent>
          </Field>
        ))}
      </CardContent>
    </Card>
  );
};

const PlusInfoCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="border-b flex items-center justify-between">
        <CardTitle className="text-primary">Title</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 auto-rows-auto gap-2">
        {plus.map((index, i) => (
          <Field key={index}>
            <FieldLabel>Label</FieldLabel>
            <FieldContent>Content</FieldContent>
          </Field>
        ))}
      </CardContent>
    </Card>
  );
};

export default function AccountInfo() {
  return (
    <div className="flex-1 p-4 lg:p-12 flex items-center justify-center">
      <div className="flex flex-col items-start justify-center w-full max-w-sm lg:max-w-2xl gap-2 mt-15 lg:mt-0">
        <h1>Perfil</h1>

        <PerfilCard />

        <InfoMainContentCard />

        <PlusInfoCard />
      </div>
    </div>
  );
}

const index = [1, 2, 3, 4, 5, 6];

const plus = [1, 2, 3];
