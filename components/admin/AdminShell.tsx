"use client";

import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import type { SessaoUsuario } from "@/lib/auth";

export function AdminShell({
  children,
  sessao,
}: {
  children: React.ReactNode;
  sessao: SessaoUsuario | null;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) return <div className="min-h-screen bg-paper">{children}</div>;

  return (
    <div className="min-h-screen bg-paper">
      <AdminNav sessao={sessao} />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
