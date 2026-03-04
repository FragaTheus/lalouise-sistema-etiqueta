import { UserIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export interface PerfilCardProps {
  nickname?: string;
  role?: string;
  email?: string;
}

export default function PerfilCard({ nickname, role, email }: PerfilCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex">
        <UserIcon className="text-primary w-18 h-18 mr-2" />
        <div className="flex flex-col">
          <span>{nickname}</span>
          <span>{role}</span>
          <span>{email}</span>
        </div>
      </CardContent>
    </Card>
  );
}
