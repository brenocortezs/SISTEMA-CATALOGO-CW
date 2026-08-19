import { Logo } from "@/components/shared/Logo";
import { BioButtons } from "@/components/bio/BioButtons";

export default function BioPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-ink-bg px-4 py-16 text-center">
      <Logo size="lg" tone="light" href={null} />
      <BioButtons />
    </div>
  );
}
