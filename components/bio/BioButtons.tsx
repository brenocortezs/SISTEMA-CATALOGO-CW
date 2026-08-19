import Link from "next/link";
import { GRUPO_VIP_URL, MENSAGEM_PADRAO_BIO, WHATSAPP_NUMERO } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function BioButtons() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Link
        href="/catalogo"
        className="rounded-none border border-ink px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Acessar site
      </Link>
      <a
        href={GRUPO_VIP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-none bg-ink px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.12em] text-paper transition-opacity hover:opacity-80"
      >
        Grupo VIP
      </a>
      <a
        href={buildWhatsAppLink(WHATSAPP_NUMERO, MENSAGEM_PADRAO_BIO)}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-none border border-ink px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}
