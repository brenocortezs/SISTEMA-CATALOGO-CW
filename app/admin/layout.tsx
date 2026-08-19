import { AdminShell } from "@/components/admin/AdminShell";
import { getSessaoAtual } from "@/lib/sessao";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sessao = await getSessaoAtual();

  return <AdminShell sessao={sessao}>{children}</AdminShell>;
}
