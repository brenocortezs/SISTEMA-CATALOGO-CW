import { FormTrocarSenha } from "@/components/admin/FormTrocarSenha";
import { getSessaoAtual } from "@/lib/sessao";

export default async function MinhaContaPage() {
  const sessao = await getSessaoAtual();

  return (
    <div>
      <h1 className="font-serif text-2xl">Minha conta</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Logado como <span className="font-medium">{sessao?.usuario}</span>
        {sessao?.papel === "SUPER_ADMIN" && " (Admin Máximo)"}
      </p>

      <div className="mt-6 max-w-md">
        <FormTrocarSenha />
      </div>
    </div>
  );
}
