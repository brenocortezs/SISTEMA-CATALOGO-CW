import Link from "next/link";
import clsx from "clsx";
import { supabase } from "@/lib/supabase";
import { formatarPreco } from "@/lib/format";
import { TIPO_ACESSORIO_LABEL, STATUS_ACESSORIO_LABEL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminAcessoriosPage({
  searchParams,
}: {
  searchParams: Promise<{ aba?: string }>;
}) {
  const { aba } = await searchParams;
  const abaAtiva = aba === "vendidos" ? "vendidos" : "ativos";

  const { data } = await supabase
    .from("Acessorio")
    .select("*, FotoAcessorio(*)")
    .order("criadoEm", { ascending: false })
    .order("ordem", { referencedTable: "FotoAcessorio" });

  const todos = (data ?? []).map(({ FotoAcessorio: fotos, ...acessorio }) => ({ ...acessorio, fotos }));
  const ativos = todos.filter((a) => a.status !== "VENDIDO");
  const vendidos = todos.filter((a) => a.status === "VENDIDO");
  const acessorios = abaAtiva === "vendidos" ? vendidos : ativos;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl">Acessórios</h1>
        <Link
          href="/admin/acessorios/novo"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium uppercase tracking-wide text-white hover:bg-neutral-800"
        >
          Novo acessório
        </Link>
      </div>

      <div className="mt-6 flex gap-2 border-b border-neutral-200">
        <Link
          href="/admin/acessorios"
          className={clsx(
            "px-4 py-2 text-sm",
            abaAtiva === "ativos" ? "border-b-2 border-black font-medium" : "text-neutral-500"
          )}
        >
          Ativos ({ativos.length})
        </Link>
        <Link
          href="/admin/acessorios?aba=vendidos"
          className={clsx(
            "px-4 py-2 text-sm",
            abaAtiva === "vendidos" ? "border-b-2 border-black font-medium" : "text-neutral-500"
          )}
        >
          Vendidos ({vendidos.length})
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-neutral-200 text-left text-neutral-500">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {acessorios.map((acessorio) => (
              <tr key={acessorio.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/acessorios/${acessorio.id}`} className="font-medium hover:underline">
                    {acessorio.nome}
                  </Link>
                </td>
                <td className="px-4 py-3">{TIPO_ACESSORIO_LABEL[acessorio.tipo]}</td>
                <td className="px-4 py-3">{formatarPreco(acessorio.preco.toString())}</td>
                <td className="px-4 py-3">{STATUS_ACESSORIO_LABEL[acessorio.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {acessorios.length === 0 && (
          <p className="p-6 text-center text-neutral-500">
            {abaAtiva === "vendidos" ? "Nenhum acessório vendido ainda." : "Nenhum acessório ativo no momento."}
          </p>
        )}
      </div>
    </div>
  );
}
