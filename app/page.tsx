import { Logo } from "@/components/shared/Logo";
import { BioButtons } from "@/components/bio/BioButtons";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

export default function BioPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-paper px-4 py-16 text-center">
      <Logo size="lg" tone="dark" href={null} />

      <p className="-mt-4 text-xs uppercase tracking-[0.1em] text-muted">
        Relógios de luxo · Autenticidade verificada
      </p>

      <BioButtons />

      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs uppercase tracking-[0.14em] text-muted hover:text-ink"
      >
        {INSTAGRAM_HANDLE}
      </a>
    </div>
  );
}
