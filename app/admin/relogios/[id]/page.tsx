import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FormRelogio } from "@/components/admin/FormRelogio";

export default async function EditarRelogioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await supabase
    .from("Relogio")
    .select("*, FotoRelogio(*)")
    .eq("id", id)
    .order("ordem", { referencedTable: "FotoRelogio" })
    .maybeSingle();

  if (!data) notFound();

  const { FotoRelogio: fotos, ...relogio } = data;

  return (
    <div>
      <h1 className="font-serif text-2xl">
        Editar {relogio.marca} {relogio.modelo}
      </h1>
      <div className="mt-6 max-w-3xl">
        <FormRelogio relogio={{ ...relogio, fotos, preco: Number(relogio.preco) }} />
      </div>
    </div>
  );
}
