import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import UpdateProfileClient from "@/wrapper/update-profile-client";

export default function AppProfileEditDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Atualizar seus dados</DialogTitle>
        <DialogDescription>
          Fique à vontade para alterar o que quiser
        </DialogDescription>
      </DialogHeader>

      <UpdateProfileClient />

      <DialogFooter>
        <DialogClose asChild className="w-full">
          <Button
            variant={"ghost"}
            className="text-destructive hover:text-destructive active:text-destructive hover:bg-destructive/5 active:bg-destructive/10 cursor-pointer"
          >
            Deixa pra lá
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
