"use client";

import Form from "../components/Form";

const loginFields = [
  {
    label: "E-mail",
    type: "email",
    name: "email",
  },
  {
    label: "Senha",
    type: "password",
    name: "password",
  },
];

function mock() {
  return null;
}

export default function Home() {
  return (
    <div className="h-svh flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md flex items-center justify-center">
        <div className="flex flex-col w-full">
          <h1 className="font-bold text-primary">Olá,</h1>
          <h1 className="font-bold mb-1">Bem-vindo!</h1>

          <p className="text-foreground/60 mb-6 text-p">
            Faça login para começarmos.
          </p>

          <Form buttonText="Entrar" fields={loginFields} />

          <div className="mt-6 flex flex-col gap-1">
            <small className="text-foreground/40 block text-small">
              Algum problema para fazer login?
            </small>
            <small className="text-foreground/40 block text-small">
              Entre em contato com a administradora.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
