"use client";

import InfoView from "@/components/InfoView";
import logo from "@/assets/login-icon.svg";
import Image from "next/image";

export default function InfoPageLayout() {
  const product = {
    id: "prod_1",
    title: "Produto de Exemplo",
    description:
      "Descrição do produto exemplo. Aqui vão detalhes principais sobre o produto.",
    sku: "ABC-123",
    price: "R$ 12,50",
    stock: 24,
    category: "Alimentos",
  };

  const fields = [
    { key: "sku", label: "SKU", value: product.sku },
    { key: "price", label: "Preço", value: product.price },
    { key: "stock", label: "Estoque", value: String(product.stock) },
    { key: "category", label: "Categoria", value: product.category },
  ];

  return (
    <div className="flex-1 p-4 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-amber-100 flex rounded-lg">
        <InfoView
          title={product.title}
          description={product.description}
          fields={fields}
          onEdit={() => console.log("edit", product.id)}
          onDelete={() => console.log("delete", product.id)}
        />
      </div>
      <div className="hidden lg:flex bg-surface rounded-lg">
        <Image src={logo} alt="Logo" className="w-full h-auto object-contain" />
      </div>
    </div>
  );
}
