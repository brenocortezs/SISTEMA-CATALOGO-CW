import { FormUsuario } from "@/components/admin/FormUsuario";

export default function NovoUsuarioPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl">Novo colaborador</h1>
      <div className="mt-6 max-w-md">
        <FormUsuario />
      </div>
    </div>
  );
}
