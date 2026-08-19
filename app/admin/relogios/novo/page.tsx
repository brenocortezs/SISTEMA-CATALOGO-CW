import { FormRelogio } from "@/components/admin/FormRelogio";

export default function NovoRelogioPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl">Novo relógio</h1>
      <div className="mt-6 max-w-3xl">
        <FormRelogio />
      </div>
    </div>
  );
}
