"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/relogios", label: "Relógios" },
  { href: "/admin/acessorios", label: "Acessórios" },
  { href: "/admin/depoimentos", label: "Depoimentos" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-hairline bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          <span className="font-serif text-lg uppercase tracking-wide">Concept Watch Admin</span>
          <nav className="hidden gap-6 text-sm sm:flex">
            {LINKS.map((link) => (
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
        <button
          onClick={handleLogout}
          className="text-sm text-muted hover:text-ink"
        >
          Sair
        </button>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-hairline px-4 py-2 text-sm sm:hidden">
        {LINKS.map((link) => (
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
      </nav>
    </header>
  );
}
