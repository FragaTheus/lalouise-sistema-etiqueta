import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import error401 from "@/shared/assets/401 Error Unauthorized-pana.svg";

export default function Unauthorized() {
  return (
    <div className="w-screen h-svh flex items-center justify-center p-4">
      <div className="m-auto self-center max-w-7xl min-w-xs flex items-center justify-center flex-col">
        <Image src={error401} alt="Não Autorizado" />
        <h1>Não Autorizado</h1>
        <p className="text-center">
          Você não tem permissão para acessar esta página. Por favor, entre em
          contato com o administrador do sistema para obter acesso.
        </p>
        <Link href="/painel/etiquetas/imprimir">
          <Button variant={"link"}>Voltar</Button>
        </Link>
      </div>
    </div>
  );
}
