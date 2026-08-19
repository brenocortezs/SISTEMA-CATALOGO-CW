import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminDepoimentosPage() {
  const { data } = await supabase.from("Depoimento").select("*").order("criadoEm", { ascending: false });
  const depoimentos = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl">Depoimentos</h1>
        <Link
          href="/admin/depoimentos/novo"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium uppercase tracking-wide text-white hover:bg-neutral-800"
        >
          Novo depoimento
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {depoimentos.map((depoimento) => (
          <Link
            key={depoimento.id}
            href={`/admin/depoimentos/${depoimento.id}`}
            className="relative aspect-[9/16] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 hover:shadow"
          >
            {depoimento.imagem && (
              <Image src={depoimento.imagem} alt="" fill sizes="200px" className="object-cover" />
            )}
          </Link>
        ))}

        {depoimentos.length === 0 && (
          <p className="col-span-full rounded-lg border border-neutral-200 bg-white p-6 text-center text-neutral-500">
            Nenhum depoimento cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
