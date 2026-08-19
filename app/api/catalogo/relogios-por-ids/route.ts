import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const idsParam = request.nextUrl.searchParams.get("ids") ?? "";
  const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean);

  if (ids.length === 0) return NextResponse.json([]);

  const { data, error } = await supabase
    .from("Relogio")
    .select("*, FotoRelogio(*)")
    .in("id", ids)
    .eq("status", "DISPONIVEL")
    .order("ordem", { referencedTable: "FotoRelogio" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const relogios = data.map(({ FotoRelogio: fotos, ...relogio }) => ({ ...relogio, fotos }));
  return NextResponse.json(relogios);
}
