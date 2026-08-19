import clsx from "clsx";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMERO } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton({
  mensagem,
  texto = "Comprar no WhatsApp",
  variant = "solid",
  tone = "light",
  sticky = false,
  className,
}: {
  mensagem: string;
  texto?: string;
  variant?: "solid" | "outline";
  tone?: "light" | "dark";
  sticky?: boolean;
  className?: string;
}) {
  const href = buildWhatsAppLink(WHATSAPP_NUMERO, mensagem);

  const styles =
    tone === "light"
      ? variant === "solid"
        ? "bg-ink text-paper hover:opacity-80"
        : "border border-ink text-ink hover:bg-ink hover:text-paper"
      : variant === "solid"
        ? "bg-ink-text text-ink-bg hover:opacity-80"
        : "border border-ink-text text-ink-text hover:bg-ink-text hover:text-ink-bg";

  const button = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] transition-colors",
        styles,
        sticky && "w-full py-4 text-sm shadow-lg",
        className
      )}
    >
      <MessageCircle size={18} />
      {texto}
    </a>
  );

  if (!sticky) return button;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-paper/95 p-3 backdrop-blur sm:hidden">
      {button}
    </div>
  );
}
