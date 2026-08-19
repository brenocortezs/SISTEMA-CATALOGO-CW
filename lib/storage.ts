import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";

const BUCKET = "fotos";
const MARCADOR_URL_PUBLICA = `/storage/v1/object/public/${BUCKET}/`;

export async function enviarFoto(file: File): Promise<string> {
  const extensao = file.name.split(".").pop() || "jpg";
  const path = `${randomUUID()}.${extensao}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || undefined,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function removerFoto(url: string): Promise<void> {
  const indice = url.indexOf(MARCADOR_URL_PUBLICA);
  if (indice === -1) return;

  const path = url.slice(indice + MARCADOR_URL_PUBLICA.length);
  await supabase.storage.from(BUCKET).remove([path]);
}
