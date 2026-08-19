import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function SeloAutenticidade() {
  return (
    <Link
      href="/catalogo/verificacao"
      className="flex items-center gap-3 border border-hairline px-4 py-3 text-ink transition-colors hover:border-ink"
    >
      <ShieldCheck size={22} className="shrink-0" />
      <span className="flex flex-col gap-0.5">
        <span className="text-xs font-medium uppercase tracking-[0.06em]">Autenticidade verificada</span>
        <span className="text-[11px] text-muted">
          Toda peça passa pelo nosso processo de verificação. Saiba como funciona.
        </span>
      </span>
    </Link>
  );
}
