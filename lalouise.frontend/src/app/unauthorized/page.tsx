export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <h1 className="text-primary">403</h1>
        <h2> Acesso Negado</h2>
      </div>
      <div className="flex flex-col items-center">
        <p className="">
          Desculpe, você não tem permissão para acessar este recurso.
        </p>
        <small className="text-gray-500">
          Se você acredita que isto é um erro, entre em contato com o
          administrador.
        </small>
      </div>

      <div className="flex w-full justify-evenly">
        <a
          className="text-p font-semibold text-primary hover:text-primary/70 cursor-pointer"
          href="/login"
        >
          Voltar ao início
        </a>
        <a
          className="text-p font-semibold text-primary hover:text-primary/70 cursor-pointer"
          href="/dashboard"
        >
          Painel administrativo
        </a>
      </div>
    </div>
  );
}
