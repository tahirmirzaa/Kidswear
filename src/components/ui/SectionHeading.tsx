import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaTo,
  align = "left",
  children,
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 flex flex-col gap-3 sm:mb-10 ${align === "center" ? "items-center text-center" : "items-start"}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">{eyebrow}</span>
      )}
      <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div className={align === "center" ? "mx-auto max-w-xl text-center" : ""}>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
          {description && <p className="mt-2 max-w-md text-sm text-ink-soft">{description}</p>}
        </div>
        {ctaLabel && ctaTo && (
          <Link to={ctaTo} className="shrink-0 text-sm font-semibold text-ink underline underline-offset-4 hover:text-burgundy">
            {ctaLabel}
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
