import { FormDepoimento } from "@/components/admin/FormDepoimento";

export default function NovoDepoimentoPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl">Novo depoimento</h1>
      <div className="mt-6 max-w-2xl">
        <FormDepoimento />
      </div>
    </div>
  );
}
