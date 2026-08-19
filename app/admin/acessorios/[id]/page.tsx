import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FormAcessorio } from "@/components/admin/FormAcessorio";

export default async function EditarAcessorioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await supabase
    .from("Acessorio")
    .select("*, FotoAcessorio(*)")
    .eq("id", id)
    .order("ordem", { referencedTable: "FotoAcessorio" })
    .maybeSingle();

  if (!data) notFound();

  const { FotoAcessorio: fotos, ...acessorio } = data;

  return (
    <div>
      <h1 className="font-serif text-2xl">Editar {acessorio.nome}</h1>
      <div className="mt-6 max-w-3xl">
        <FormAcessorio acessorio={{ ...acessorio, fotos, preco: Number(acessorio.preco) }} />
      </div>
    </div>
  );
}
