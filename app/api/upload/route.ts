import { NextRequest, NextResponse } from "next/server";
import { enviarFoto, removerFoto } from "@/lib/storage";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 });
  }

  try {
    const url = await enviarFoto(file);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Falha no upload" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "URL não informada" }, { status: 400 });
  }

  await removerFoto(url);
  return NextResponse.json({ ok: true });
}
