import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import notFoundIcon from "@/shared/assets/notfound-icon.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 max-w-sm m-auto">
      <Image src={notFoundIcon} alt="404 Nao encontrado" />
      <h1 className="font-bold">404</h1>
      <h2 className="text-xl font-medium">Página não encontrada</h2>
      <p className="text-muted-foreground text-sm">
        A página que você procura não existe ou foi movida.
      </p>
      <Button asChild variant={"link"}>
        <Link href="/painel">Voltar ao início</Link>
      </Button>
    </div>
  );
}
