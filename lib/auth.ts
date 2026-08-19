import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET não configurado");
  return new TextEncoder().encode(secret);
}

export async function signSession(usuario: string): Promise<string> {
  return new SignJWT({ usuario })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<{ usuario: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.usuario !== "string") return null;
    return { usuario: payload.usuario };
  } catch {
    return null;
  }
}

export function validarCredenciais(usuario: string, senha: string): boolean {
  return usuario === process.env.ADMIN_USERNAME && senha === process.env.ADMIN_PASSWORD;
}

export { COOKIE_NAME, SESSION_DURATION_SECONDS };
