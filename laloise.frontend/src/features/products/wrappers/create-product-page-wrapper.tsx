import AppFormPageLayout from "@/shared/components/layouts/form-page-layout/app-form-layout";
import productImgSrc from "@/shared/assets/product-icon.svg";
import CreateProductClientWrapper from "./create-product-client-wrapper";

export default function CreateProductPageWrapper() {
  return (
    <AppFormPageLayout
      cardTitle="Novo Produto"
      cardDescription="Preencha as informações para criar um novo produto"
      cardImgSrc={productImgSrc}
    >
      <CreateProductClientWrapper />
    </AppFormPageLayout>
  );
}
