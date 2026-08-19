const CHAVE = "cw-favoritos";
const EVENTO = "cw-favoritos-changed";

function ler(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CHAVE);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function escrever(ids: string[]) {
  window.localStorage.setItem(CHAVE, JSON.stringify(ids));
  window.dispatchEvent(new Event(EVENTO));
}

export function getFavoritos(): string[] {
  return ler();
}

export function isFavorito(id: string): boolean {
  return ler().includes(id);
}

export function toggleFavorito(id: string): boolean {
  const atuais = ler();
  const existe = atuais.includes(id);
  const novos = existe ? atuais.filter((f) => f !== id) : [...atuais, id];
  escrever(novos);
  return !existe;
}

export function onFavoritosChange(callback: () => void): () => void {
  window.addEventListener(EVENTO, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENTO, callback);
    window.removeEventListener("storage", callback);
  };
}
