import { Header } from "@/components/catalogo/Header";
import { Footer } from "@/components/catalogo/Footer";
import { GrupoVipCTA } from "@/components/catalogo/GrupoVipCTA";
import { WhatsAppFAB } from "@/components/catalogo/WhatsAppFAB";

export default function CatalogoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <GrupoVipCTA />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
