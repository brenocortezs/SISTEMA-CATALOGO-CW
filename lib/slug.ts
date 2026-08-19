import slugify from "slugify";

export function gerarSlugBase(...partes: string[]): string {
  return slugify(partes.filter(Boolean).join(" "), { lower: true, strict: true });
}

export function gerarSufixoAleatorio(): string {
  return Math.random().toString(36).slice(2, 7);
}

export async function gerarSlugUnico(
  base: string,
  existe: (slug: string) => Promise<boolean>
): Promise<string> {
  let slug = base;
  while (await existe(slug)) {
    slug = `${base}-${gerarSufixoAleatorio()}`;
  }
  return slug;
}
