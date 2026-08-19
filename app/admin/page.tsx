import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [relogiosDisponiveis, relogiosVendidos, acessorios] = await Promise.all([
    supabase.from("Relogio").select("id", { count: "exact", head: true }).eq("status", "DISPONIVEL"),
    supabase.from("Relogio").select("id", { count: "exact", head: true }).eq("status", "VENDIDO"),
    supabase.from("Acessorio").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    { label: "Relógios disponíveis", value: relogiosDisponiveis.count ?? 0, href: "/admin/relogios" },
    { label: "Relógios vendidos", value: relogiosVendidos.count ?? 0, href: "/admin/relogios" },
    { label: "Acessórios cadastrados", value: acessorios.count ?? 0, href: "/admin/acessorios" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl">Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-neutral-200 bg-white p-6 hover:shadow"
          >
            <span className="text-3xl font-semibold">{card.value}</span>
            <p className="mt-1 text-sm text-neutral-500">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
