import { MoreHorizontal } from "lucide-react";
import { CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
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
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.active}</TableCell>
              <TableCell>{row.role}</TableCell>
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
  email: string;
  active: boolean;
  role: "Admin" | "User";
};

export const data: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@example.com",
    active: true,
    role: "Admin",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    active: true,
    role: "User",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@example.com",
    active: true,
    role: "User",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@example.com",
    active: false,
    role: "User",
  },
  {
    id: "5",
    name: "Carlos Lima",
    email: "carlos.lima@example.com",
    active: true,
    role: "User",
  },
  {
    id: "6",
    name: "Lucia Martins",
    email: "lucia.martins@example.com",
    active: true,
    role: "Admin",
  },
  {
    id: "7",
    name: "Roberto Ferreira",
    email: "roberto.ferreira@example.com",
    active: false,
    role: "User",
  },
  {
    id: "8",
    name: "Fernanda Rocha",
    email: "fernanda.rocha@example.com",
    active: true,
    role: "User",
  },
  {
    id: "9",
    name: "Diego Alves",
    email: "diego.alves@example.com",
    active: true,
    role: "User",
  },
  {
    id: "10",
    name: "Patricia Gomes",
    email: "patricia.gomes@example.com",
    active: true,
    role: "User",
  },
];
