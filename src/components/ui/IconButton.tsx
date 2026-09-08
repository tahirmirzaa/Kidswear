import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  active?: boolean;
}

export default function IconButton({ icon, label, active, className, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-ivory-dark sm:h-9 sm:w-9",
        active && "text-burgundy",
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
