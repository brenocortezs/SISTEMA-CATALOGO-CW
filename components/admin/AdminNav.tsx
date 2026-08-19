"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { SessaoUsuario } from "@/lib/auth";

const LINKS_BASE = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/relogios", label: "Relógios" },
  { href: "/admin/acessorios", label: "Acessórios" },
  { href: "/admin/depoimentos", label: "Depoimentos" },
];

export function AdminNav({ sessao }: { sessao: SessaoUsuario | null }) {
  const pathname = usePathname();
  const links =
    sessao?.papel === "SUPER_ADMIN"
      ? [...LINKS_BASE, { href: "/admin/usuarios", label: "Usuários" }]
      : LINKS_BASE;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    // Navegação completa (não router.push) para evitar que o Router Cache do Next
    // reutilize uma resposta anterior antes do cookie de sessão ser removido.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/admin/login";
  }

  return (
    <header className="border-b border-hairline bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          <span className="font-serif text-lg uppercase tracking-wide">Concept Watch Admin</span>
          <nav className="hidden gap-6 text-sm sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "hover:text-muted",
                  pathname === link.href ? "font-semibold text-ink" : "text-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {sessao && (
            <Link href="/admin/conta" className="hidden text-xs text-muted hover:text-ink sm:block">
              {sessao.usuario}
              {sessao.papel === "SUPER_ADMIN" && (
                <span className="ml-1.5 border border-hairline px-1.5 py-0.5 text-[9px] uppercase tracking-[0.06em]">
                  Admin Máximo
                </span>
              )}
            </Link>
          )}
          <button onClick={handleLogout} className="text-sm text-muted hover:text-ink">
            Sair
          </button>
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-hairline px-4 py-2 text-sm sm:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "whitespace-nowrap",
              pathname === link.href ? "font-semibold text-ink" : "text-muted"
            )}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/admin/conta" className="whitespace-nowrap text-muted">
          Minha conta
        </Link>
      </nav>
    </header>
  );
}
