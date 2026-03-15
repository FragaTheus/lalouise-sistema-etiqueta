import AppImageCard from "@/shared/components/app-image-card/app-image-card";
import labelImgSrc from "@/shared/assets/labels-icon.svg";
import PrintLabelForm from "@/features/label/components/print-label-form";

export default function PrintLabelPageLayout() {
  return (
    <div className="flex-1 px-4 py-3 lg:p-8 items-center justify-center flex flex-col w-full mt-10 mb-4 lg:mt-0">
      <AppImageCard
        title="Imprimir Etiqueta"
        description="Selecione o produto e o armazenamento para gerar a etiqueta"
        imgSrc={labelImgSrc}
      >
        <PrintLabelForm />
      </AppImageCard>
    </div>
  );
}
