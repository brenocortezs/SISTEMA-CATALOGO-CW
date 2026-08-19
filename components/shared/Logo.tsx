import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const ICON_RATIO = 1109 / 999;
const FULL_RATIO = 1372 / 1598;

export function Logo({
  size = "md",
  href = "/catalogo",
  variant = "full",
  tone = "light",
  className,
}: {
  size?: "sm" | "md" | "lg";
  href?: string | null;
  variant?: "full" | "compact";
  tone?: "light" | "dark";
  className?: string;
}) {
  const content =
    variant === "full" ? (
      <FullLockup size={size} tone={tone} className={className} />
    ) : (
      <CompactLockup size={size} tone={tone} className={className} />
    );

  if (!href) return content;
  return <Link href={href}>{content}</Link>;
}

function FullLockup({
  size,
  tone,
  className,
}: {
  size: "sm" | "md" | "lg";
  tone: "light" | "dark";
  className?: string;
}) {
  const width = { sm: 120, md: 180, lg: 320 }[size];
  const height = Math.round(width * FULL_RATIO);

  return (
    <Image
      src={tone === "light" ? "/logo-full-white.png" : "/logo-full-black.png"}
      alt="Concept Watch"
      width={width}
      height={height}
      className={clsx("shrink-0", className)}
      priority
    />
  );
}

function CompactLockup({
  size,
  tone,
  className,
}: {
  size: "sm" | "md" | "lg";
  tone: "light" | "dark";
  className?: string;
}) {
  const iconWidth = { sm: 32, md: 48, lg: 88 }[size];
  const iconHeight = Math.round(iconWidth * ICON_RATIO);
  const textSize = { sm: "text-sm", md: "text-lg", lg: "text-3xl" }[size];
  const textColor = tone === "light" ? "text-white" : "text-black";

  return (
    <div className={clsx("flex flex-row items-center gap-2", className)}>
      <Image
        src={tone === "light" ? "/logo-icon-white.png" : "/logo-icon-black.png"}
        alt="Concept Watch"
        width={iconWidth}
        height={iconHeight}
        className="shrink-0"
        priority
      />
      <span className={clsx("font-serif tracking-[0.2em] uppercase", textSize, textColor)}>
        Concept Watch
      </span>
    </div>
  );
}
