import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { launchProducts } from "../../data/products";
import { formatINR } from "../../lib/utils";

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = query.trim()
    ? launchProducts
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : [];

  const goToResults = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40 animate-fade-in" onClick={onClose} />
      <div className="relative mx-3 mt-3 max-h-[80vh] overflow-y-auto rounded-2xl bg-ivory p-5 shadow-card animate-fade-in sm:mx-auto sm:mt-24 sm:max-w-2xl sm:p-6">
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <Search size={18} className="text-ink-soft" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goToResults()}
            placeholder="Search for frocks, co-ord sets, pajamas..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-soft/50"
          />
          <button onClick={onClose} aria-label="Close search" className="rounded-full p-1 hover:bg-ivory-dark">
            <X size={18} />
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-4 flex flex-col divide-y divide-line">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  navigate(`/product/${p.slug}`);
                  onClose();
                }}
                className="flex items-center gap-3 py-3 text-left hover:bg-ivory-dark/50"
              >
                <img src={p.images[0]} alt="" className="h-14 w-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-ink-soft">{formatINR(p.discountPrice ?? p.price)}</p>
                </div>
              </button>
            ))}
            <button onClick={goToResults} className="py-3 text-left text-sm font-medium text-burgundy">
              See all results for "{query}"
            </button>
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <p className="py-6 text-center text-sm text-ink-soft">No products found for "{query}"</p>
        )}

        {!query.trim() && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {["Frocks", "Co-ord Set", "Shirt & Shorts", "Pajama Set", "Nightdress", "Overshirt"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft hover:border-ink hover:text-ink"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
