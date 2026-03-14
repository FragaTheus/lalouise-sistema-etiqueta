import CreateSectorForm from "@/features/sectors/components/create-sector-form";
import CreateSectorFormLayout from "@/features/sectors/components/create-sector-form-layout";

export default function CreateSectorPageWrapper() {
  return (
    <CreateSectorFormLayout>
      <CreateSectorForm />
    </CreateSectorFormLayout>
  );
}
