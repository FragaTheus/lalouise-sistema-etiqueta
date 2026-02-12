import Form from "@/components/Form";

export default function Labels() {
  const storageOptions = [
    "AMBIENTE",
    "REFRIGERADO",
    "CONGELADO",
    "HIPER_CONGELADO",
  ];

  const labelFields = [
    {
      label: "Produto",
      type: "text",
      name: "productName",
    },
    {
      label: "Tipo de Armazenamento",
      type: "select",
      name: "storageType",
      options: storageOptions,
    },
    {
      label: "Quantidade de Cópias",
      type: "number",
      name: "copies",
    },
  ];

  return (
    <div className="h-svh w-full flex items-center justify-center">
      <div className="p-4 max-w-md mx-auto">
        <h1 className="font-bold text-primary text-h1">Gerar Etiquetas</h1>
        <p className="text-foreground/60 mb-8">
          Selecione o produto e a quantidade de cópias para impressão.
        </p>

        <Form fields={labelFields} buttonText="Gerar Etiquetas" />
      </div>
    </div>
  );
}
