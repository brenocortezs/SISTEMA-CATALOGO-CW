import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({ items, tone = "light" }: { items: BreadcrumbItem[]; tone?: "light" | "dark" }) {
  const mutedClass = tone === "light" ? "text-muted" : "text-ink-muted";
  const inkClass = tone === "light" ? "text-ink" : "text-ink-text";
  const hoverClass = tone === "light" ? "hover:text-ink" : "hover:text-ink-text";

  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx("flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.06em]", mutedClass)}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className={hoverClass}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? inkClass : undefined}>{item.label}</span>
            )}
            {!isLast && <ChevronRight size={12} />}
          </span>
        );
      })}
    </nav>
  );
}
