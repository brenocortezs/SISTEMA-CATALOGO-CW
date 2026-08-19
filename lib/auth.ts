import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

export type SessaoUsuario = {
  id: string;
  usuario: string;
  papel: "SUPER_ADMIN" | "ADMIN";
};

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET não configurado");
  return new TextEncoder().encode(secret);
}

export async function signSession(sessao: SessaoUsuario): Promise<string> {
  return new SignJWT({ id: sessao.id, usuario: sessao.usuario, papel: sessao.papel })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<SessaoUsuario | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (
      typeof payload.id !== "string" ||
      typeof payload.usuario !== "string" ||
      (payload.papel !== "SUPER_ADMIN" && payload.papel !== "ADMIN")
    ) {
      return null;
    }
    return { id: payload.id, usuario: payload.usuario, papel: payload.papel };
  } catch {
    return null;
  }
}

export { COOKIE_NAME, SESSION_DURATION_SECONDS };
