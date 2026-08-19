import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FormDepoimento } from "@/components/admin/FormDepoimento";

export default async function EditarDepoimentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: depoimento } = await supabase.from("Depoimento").select("*").eq("id", id).maybeSingle();

  if (!depoimento) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl">Editar depoimento</h1>
      <div className="mt-6 max-w-2xl">
        <FormDepoimento depoimento={depoimento} />
      </div>
    </div>
  );
}
