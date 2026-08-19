"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMERO, MENSAGEM_PADRAO_BIO } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFAB() {
  const pathname = usePathname();

  const escondidoEm = pathname.startsWith("/catalogo/relogio/");
  if (escondidoEm) return null;

  return (
    <a
      href={buildWhatsAppLink(WHATSAPP_NUMERO, MENSAGEM_PADRAO_BIO)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={26} />
    </a>
  );
}
