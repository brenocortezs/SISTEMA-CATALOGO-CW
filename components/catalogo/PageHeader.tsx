import { Breadcrumb, type BreadcrumbItem } from "@/components/catalogo/Breadcrumb";

export function PageHeader({
  eyebrow,
  titulo,
  subtitulo,
  breadcrumb,
}: {
  eyebrow: string;
  titulo: string;
  subtitulo?: string;
  breadcrumb: BreadcrumbItem[];
}) {
  return (
    <div className="bg-ink-bg px-4 py-14 text-center">
      <div className="mx-auto max-w-2xl">
        <div className="flex justify-center">
          <Breadcrumb tone="dark" items={breadcrumb} />
        </div>
        <span className="mt-6 block text-[11px] uppercase tracking-[0.16em] text-ink-muted">{eyebrow}</span>
        <h1 className="mt-2 font-serif text-3xl text-ink-text sm:text-4xl">{titulo}</h1>
        {subtitulo && <p className="mt-3 text-sm leading-relaxed text-ink-muted">{subtitulo}</p>}
      </div>
    </div>
  );
}
