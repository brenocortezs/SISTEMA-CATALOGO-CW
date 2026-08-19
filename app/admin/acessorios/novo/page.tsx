import { FormAcessorio } from "@/components/admin/FormAcessorio";

export default function NovoAcessorioPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl">Novo acessório</h1>
      <div className="mt-6 max-w-3xl">
        <FormAcessorio />
      </div>
    </div>
  );
}
