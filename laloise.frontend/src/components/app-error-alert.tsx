import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AppErrorAlertProps {
  message: string | null;
  onClose?: () => void;
}

export function AppErrorAlert({ message, onClose }: AppErrorAlertProps) {
  if (!message) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 q p-4 lg:p-8"
      onClick={onClose}
    >
      <Alert
        variant="destructive"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md shadow-2xl cursor-default"
      >
        <AlertTitle>Não foi dessa vez 😕</AlertTitle>
        <AlertDescription className="text-muted-foreground!">
          {message ??
            "Encontramos um pequeno problema ao processar sua ação. Você pode tentar novamente agora ou em instantes."}
        </AlertDescription>
      </Alert>
    </div>
  );
}
