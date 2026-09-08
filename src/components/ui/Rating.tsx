import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export default function Rating({ value, count, size = 14, showValue = false, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-burgundy text-burgundy" : "fill-transparent text-ink-soft/40"}
            />
          );
        })}
      </div>
      {showValue && <span className="text-xs font-medium text-ink-soft">{value.toFixed(1)}</span>}
      {typeof count === "number" && <span className="text-xs text-ink-soft">({count})</span>}
    </div>
  );
}
