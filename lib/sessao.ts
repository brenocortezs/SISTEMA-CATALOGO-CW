import { cookies } from "next/headers";
import { verifySession, COOKIE_NAME, type SessaoUsuario } from "@/lib/auth";

export async function getSessaoAtual(): Promise<SessaoUsuario | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}
