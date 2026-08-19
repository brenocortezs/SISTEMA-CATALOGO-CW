import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { BotaoExcluirUsuario } from "@/components/admin/BotaoExcluirUsuario";

export const dynamic = "force-dynamic";

const PAPEL_LABEL: Record<string, string> = {
  SUPER_ADMIN: "Admin Máximo",
  ADMIN: "Colaborador",
};

export default async function AdminUsuariosPage() {
  const { data } = await supabase
    .from("Usuario")
    .select("id, usuario, papel, criadoEm")
    .order("criadoEm", { ascending: true });

  const usuarios = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl">Usuários</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Gerencie quem tem acesso ao painel administrativo.
          </p>
        </div>
        <Link
          href="/admin/usuarios/novo"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium uppercase tracking-wide text-white hover:bg-neutral-800"
        >
          Novo colaborador
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-neutral-200 text-left text-neutral-500">
            <tr>
              <th className="px-4 py-3">Usuário</th>
              <th className="px-4 py-3">Papel</th>
              <th className="px-4 py-3">Desde</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-3 font-medium">{usuario.usuario}</td>
                <td className="px-4 py-3">{PAPEL_LABEL[usuario.papel] ?? usuario.papel}</td>
                <td className="px-4 py-3 text-neutral-500">
                  {new Date(usuario.criadoEm).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-4 py-3 text-right">
                  {usuario.papel !== "SUPER_ADMIN" && (
                    <BotaoExcluirUsuario id={usuario.id} usuario={usuario.usuario} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {usuarios.length === 0 && (
          <p className="p-6 text-center text-neutral-500">Nenhum usuário cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}
