import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Review } from "../../types";
import Rating from "../ui/Rating";

export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-card sm:flex"
      >
        <ChevronLeft size={18} />
      </button>
      <div ref={scrollerRef} className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-6">
        {reviews.map((r) => (
          <div key={r.id} className="w-[85%] flex-none rounded-xl border border-line p-5 sm:w-[46%] lg:w-[31%]">
            <div className="flex items-center justify-between">
              <Rating value={r.rating} size={13} />
              <span className="text-xs text-ink-soft">{new Date(r.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-ink">{r.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{r.body}</p>
            <p className="mt-3 text-xs font-medium text-ink-soft">
              {r.author} · {r.childAge}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-card sm:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
