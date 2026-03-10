import AppFormPageLayout from "@/components/layouts/form-page-layout/app-form-layout";
import productImgSrc from "@/assets/product-icon.svg";
import CreateProductClient from "@/wrapper/create-product-client";

export default function CreateProduct() {
  return (
    <AppFormPageLayout
      cardTitle="Novo Produto"
      cardDescription="Preencha as informações para criar um novo produto"
      cardImgSrc={productImgSrc}
    >
      <CreateProductClient />
    </AppFormPageLayout>
  );
}
