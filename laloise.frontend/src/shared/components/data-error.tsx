"use client";

import { Card } from "./ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface DataErrorProps {
  error: Error | null;
  onRetry?: () => void;
}

type HttpError = Error & {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};

function getErrorMessage(error: Error | null): {
  status: number | string;
  message: string;
  userMessage: string;
} {
  if (!error) {
    return {
      status: "Desconhecido",
      message: "Um erro desconhecido ocorreu",
      userMessage:
        "Não conseguimos carregar os dados. Por favor, tente novamente mais tarde.",
    };
  }

  const axiosError = error as HttpError;
  const status = axiosError?.response?.status || "Erro";
  const backendMessage =
    axiosError?.response?.data?.message || error.message || "Erro desconhecido";

  let userMessage = "";

  if (status === 400) {
    userMessage =
      "Parece que há um problema com sua solicitação. Verifique os dados e tente novamente.";
  } else if (status === 401) {
    userMessage = "Sua sessão expirou. Por favor, faça login novamente.";
  } else if (status === 403) {
    userMessage = "Você não tem permissão para acessar estes dados.";
  } else if (status === 404) {
    userMessage = "Os dados que você procura não foram encontrados.";
  } else if (status === 500) {
    userMessage = "Erro no servidor. Por favor, tente novamente mais tarde.";
  } else {
    userMessage =
      "Ocorreu um erro ao carregar os dados. Por favor, tente novamente.";
  }

  return {
    status,
    message: backendMessage,
    userMessage,
  };
}

export function DataError({ error, onRetry }: DataErrorProps) {
  const { status, message, userMessage } = getErrorMessage(error);

  return (
    <div className="flex-1 flex items-center justify-center p-4 pt-10 lg:pt-4">
      <div className="max-h-min max-w-7xl w-full min-w-xs gap-2 flex flex-col pt-4">
        <Card className="p-8 border-destructive/30 bg-destructive/5">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-destructive">
                Erro {status}
              </span>
            </div>

            <div className="max-w-md">
              <p className="text-sm text-muted-foreground font-medium">
                {message}
              </p>
            </div>

            <div className="max-w-md">
              <p className="text-sm text-foreground">{userMessage}</p>
            </div>

            {onRetry && (
              <Button
                onClick={onRetry}
                className="mt-4 cursor-pointer"
                variant={"link"}
              >
                Tentar Novamente
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
