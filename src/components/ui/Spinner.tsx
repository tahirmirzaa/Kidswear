import { cn } from "../../lib/utils";

export default function Spinner({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ width: size, height: size }}
      className={cn("animate-spin rounded-full border-2 border-ink-soft/20 border-t-burgundy", className)}
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner size={40} />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] w-full rounded-lg bg-ivory-dark" />
      <div className="mt-3 h-3 w-3/4 rounded bg-ivory-dark" />
      <div className="mt-2 h-3 w-1/2 rounded bg-ivory-dark" />
    </div>
  );
}
