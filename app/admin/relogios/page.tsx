import Link from "next/link";
import clsx from "clsx";
import { supabase } from "@/lib/supabase";
import { formatarPreco } from "@/lib/format";
import { STATUS_RELOGIO_LABEL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminRelogiosPage({
  searchParams,
}: {
  searchParams: Promise<{ aba?: string }>;
}) {
  const { aba } = await searchParams;
  const abaAtiva = aba === "vendidos" ? "vendidos" : "ativos";

  const { data } = await supabase
    .from("Relogio")
    .select("*, FotoRelogio(*)")
    .order("criadoEm", { ascending: false })
    .order("ordem", { referencedTable: "FotoRelogio" });

  const todos = (data ?? []).map(({ FotoRelogio: fotos, ...relogio }) => ({ ...relogio, fotos }));
  const ativos = todos.filter((r) => r.status !== "VENDIDO");
  const vendidos = todos.filter((r) => r.status === "VENDIDO");
  const relogios = abaAtiva === "vendidos" ? vendidos : ativos;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl">Relógios</h1>
        <Link
          href="/admin/relogios/novo"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium uppercase tracking-wide text-white hover:bg-neutral-800"
        >
          Novo relógio
        </Link>
      </div>

      <div className="mt-6 flex gap-2 border-b border-neutral-200">
        <Link
          href="/admin/relogios"
          className={clsx(
            "px-4 py-2 text-sm",
            abaAtiva === "ativos" ? "border-b-2 border-black font-medium" : "text-neutral-500"
          )}
        >
          Ativos ({ativos.length})
        </Link>
        <Link
          href="/admin/relogios?aba=vendidos"
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
              <th className="px-4 py-3">Marca / Modelo</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Destaque</th>
              <th className="px-4 py-3">Feminino</th>
            </tr>
          </thead>
          <tbody>
            {relogios.map((relogio) => (
              <tr key={relogio.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/relogios/${relogio.id}`} className="font-medium hover:underline">
                    {relogio.marca} {relogio.modelo}
                  </Link>
                </td>
                <td className="px-4 py-3">{formatarPreco(relogio.preco.toString())}</td>
                <td className="px-4 py-3">{STATUS_RELOGIO_LABEL[relogio.status]}</td>
                <td className="px-4 py-3">{relogio.destaque ? "Sim" : "—"}</td>
                <td className="px-4 py-3">{relogio.feminino ? "Sim" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {relogios.length === 0 && (
          <p className="p-6 text-center text-neutral-500">
            {abaAtiva === "vendidos" ? "Nenhum relógio vendido ainda." : "Nenhum relógio ativo no momento."}
          </p>
        )}
      </div>
    </div>
  );
}
