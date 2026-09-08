import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: ReactNode;
}

const variants: Record<string, string> = {
  primary: "bg-ink text-ivory hover:bg-burgundy",
  secondary: "bg-burgundy text-ivory hover:bg-burgundy-dark",
  outline: "border border-ink text-ink hover:bg-ink hover:text-ivory",
  ghost: "text-ink hover:bg-ivory-dark",
  link: "text-ink underline underline-offset-4 hover:text-burgundy",
};

const sizes: Record<string, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        variant !== "link" && sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
