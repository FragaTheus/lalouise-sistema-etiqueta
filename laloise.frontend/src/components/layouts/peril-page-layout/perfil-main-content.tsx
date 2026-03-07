import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Field, FieldContent, FieldLabel } from "../../ui/field";

export type MainFieldProps = {
  label: string;
  content: string;
};

export interface InfoMainContentCardProps {
  title: string;
  fields: MainFieldProps[];
}

export default function InfoMainContentCard({
  title,
  fields,
}: InfoMainContentCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="border-b flex items-center justify-between">
        <CardTitle className="text-primary">{title}</CardTitle>
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
      <CardContent className="grid grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-8">
        {fields.map((field, index) => (
          <Field key={index}>
            <FieldLabel>{field.label}</FieldLabel>
            <FieldContent>{field.content}</FieldContent>
          </Field>
        ))}
      </CardContent>
    </Card>
  );
}
