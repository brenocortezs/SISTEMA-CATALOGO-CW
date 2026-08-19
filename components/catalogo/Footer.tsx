import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_NUMERO, INSTAGRAM_URL, GRUPO_VIP_URL, MENSAGEM_PADRAO_BIO } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 text-center">
        <Link href="/catalogo">
          <Image src="/logo-icon-black.png" alt="Concept Watch" width={20} height={22} />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-[0.1em] text-muted">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            Instagram
          </a>
          <a
            href={buildWhatsAppLink(WHATSAPP_NUMERO, MENSAGEM_PADRAO_BIO)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            WhatsApp
          </a>
          <a href={GRUPO_VIP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            Grupo VIP
          </a>
        </div>

        <p className="text-[11px] text-muted">
          © {new Date().getFullYear()} Concept Watch. Todos os direitos reservados.
        </p>

        <Link href="/admin" className="text-[10px] text-hairline hover:text-muted">
          Área administrativa
        </Link>
      </div>
    </footer>
  );
}
