import { Alert } from "./ui/alert";

interface AppErrorComponentProps {
  error: string;
}

export default function AppErrorComponent({ error }: AppErrorComponentProps) {
  return (
    <Alert className="flex-1 flex items-center justify-center self-center top-1/2">
      <div className="flex flex-col items-center justify-center">
        <h1>Ops...</h1>
        <p>Algo deu errado.</p>
        <p>Tente novamente em alguns instantes</p>
        <span className="text-destructive mt-5">{error}</span>
      </div>
    </Alert>
  );
}
