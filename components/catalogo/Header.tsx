"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import clsx from "clsx";
import { Logo } from "@/components/shared/Logo";
import { getFavoritos, onFavoritosChange } from "@/lib/favoritos";

const LINKS = [
  { href: "/catalogo/pronta-entrega", label: "Pronta Entrega" },
  { href: "/catalogo/femininos", label: "Femininos" },
  { href: "/catalogo/acessorios", label: "Acessórios" },
  { href: "/catalogo/sobre", label: "Sobre" },
  { href: "/catalogo/depoimentos", label: "Depoimentos" },
  { href: "/catalogo/verificacao", label: "Verificação" },
];

function FavoritosLink() {
  const total = useSyncExternalStore(
    onFavoritosChange,
    () => getFavoritos().length,
    () => 0
  );

  return (
    <Link href="/catalogo/favoritos" aria-label="Favoritos" className="relative text-ink">
      <Heart size={20} />
      {total > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-ink text-[9px] text-paper">
          {total}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo size="sm" variant="compact" tone="dark" href="/catalogo" />

        <nav className="hidden gap-8 text-[11px] uppercase tracking-[0.1em] md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "transition-colors hover:text-ink",
                pathname === link.href ? "text-ink font-semibold" : "text-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <FavoritosLink />

          <button
            className="text-ink md:hidden"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-hairline bg-paper px-4 py-3 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "rounded px-2 py-3 text-sm uppercase tracking-wide",
                pathname === link.href ? "font-semibold text-ink" : "text-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
