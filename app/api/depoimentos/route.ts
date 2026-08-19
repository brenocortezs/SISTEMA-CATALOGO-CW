import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";
import { depoimentoSchema } from "@/lib/validations/depoimento.schema";

export async function GET() {
  const { data, error } = await supabase.from("Depoimento").select("*").order("criadoEm", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = depoimentoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data: depoimento, error } = await supabase
    .from("Depoimento")
    .insert({ id: randomUUID(), ...parsed.data })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(depoimento, { status: 201 });
}
