import { MoreHorizontal } from "lucide-react";
import { CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

export default function AppTableContent() {
  return (
    <CardContent className="overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-auto">
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
}

export type User = {
  id: string;
  name: string;
};

export const data: User[] = [
  {
    id: "1",
    name: "João Silva",
  },
  {
    id: "2",
    name: "Maria Santos",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
  },
  {
    id: "4",
    name: "Ana Costa",
  },
  {
    id: "5",
    name: "Carlos Lima",
  },
  {
    id: "6",
    name: "Lucia Martins",
  },
  {
    id: "7",
    name: "Roberto Ferreira",
  },
  {
    id: "8",
    name: "Fernanda Rocha",
  },
  {
    id: "9",
    name: "Diego Alves",
  },
  {
    id: "10",
    name: "Patricia Gomes",
  },
];
