import { AccordionItem } from "../ui/Accordion";
import ColorSwatch from "../ui/ColorSwatch";
import type { FilterState } from "../../hooks/useProductFilters";
import { launchFilterOptions } from "../../data/products";
import { launchCollections } from "../../data/taxonomy";
import { formatINR } from "../../lib/utils";

const GENDER_OPTIONS = ["girls", "boys", "unisex"];
const SIZE_OPTIONS = launchFilterOptions.sizes;
const COLOR_OPTIONS = [
  { name: "Ivory", hex: "#FAF7F2" },
  { name: "Blush Pink", hex: "#F3D9D6" },
  { name: "Sage Green", hex: "#B7CDB0" },
  { name: "Powder Blue", hex: "#B3D1DE" },
  { name: "Butter Yellow", hex: "#F6E8C8" },
  { name: "Terracotta", hex: "#C4694F" },
  { name: "Navy", hex: "#33415C" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Charcoal", hex: "#3A362F" },
  { name: "Mustard", hex: "#D9A441" },
  { name: "Lilac", hex: "#D9CEE8" },
  { name: "Coral", hex: "#E88B72" },
  { name: "Festive Gold", hex: "#C9A24B" },
  { name: "Washed Indigo", hex: "#465A78" },
];

interface FilterSidebarProps {
  filters: FilterState;
  toggleValue: (key: keyof FilterState, value: string) => void;
  setMaxPrice: (value: number) => void;
  resetFilters: () => void;
  activeCount: number;
}

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 text-sm text-ink-soft">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-line accent-burgundy"
      />
      <span className={checked ? "text-ink" : ""}>{label}</span>
    </label>
  );
}

export default function FilterSidebar({ filters, toggleValue, setMaxPrice, resetFilters, activeCount }: FilterSidebarProps) {
  return (
    <div>
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Filters</h2>
        {activeCount > 0 && (
          <button onClick={resetFilters} className="text-xs font-medium text-burgundy">
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <AccordionItem title="Collection" defaultOpen>
        {launchCollections.map((c) => (
          <CheckboxRow
            key={c.slug}
            label={c.label}
            checked={filters.collections.includes(c.slug)}
            onChange={() => toggleValue("collections", c.slug)}
          />
        ))}
      </AccordionItem>

      <AccordionItem title="Gender">
        {GENDER_OPTIONS.map((g) => (
          <CheckboxRow key={g} label={g[0].toUpperCase() + g.slice(1)} checked={filters.genders.includes(g)} onChange={() => toggleValue("genders", g)} />
        ))}
      </AccordionItem>

      <AccordionItem title="Size" defaultOpen>
        <div className="flex flex-wrap gap-2 pt-1">
          {SIZE_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => toggleValue("sizes", s)}
              className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${
                filters.sizes.includes(s) ? "border-ink bg-ink text-ivory" : "border-line text-ink-soft hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Colour">
        <div className="flex flex-wrap gap-2 pt-1">
          {COLOR_OPTIONS.map((c) => (
            <ColorSwatch key={c.name} color={c} selected={filters.colors.includes(c.name)} onClick={() => toggleValue("colors", c.name)} />
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Price">
        <div className="pt-1">
          <input
            type="range"
            min={launchFilterOptions.minPrice}
            max={launchFilterOptions.maxPrice}
            step={50}
            value={filters.maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-burgundy"
          />
          <div className="mt-1 flex justify-between text-xs text-ink-soft">
            <span>{formatINR(launchFilterOptions.minPrice)}</span>
            <span className="font-medium text-ink">Up to {formatINR(filters.maxPrice)}</span>
          </div>
        </div>
      </AccordionItem>
    </div>
  );
}
