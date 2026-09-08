import { useState } from "react";
import { cn } from "../../lib/utils";

const rows = [
  { size: "0-3M / 3-6M", age: "Newborn – 6 months", chestCm: [40, 44], heightCm: [50, 62] },
  { size: "6-9M / 9-12M", age: "6 – 12 months", chestCm: [45, 47], heightCm: [63, 74] },
  { size: "1-2Y / 2-3Y", age: "1 – 3 years", chestCm: [48, 52], heightCm: [75, 95] },
  { size: "3-4Y / 4-5Y", age: "3 – 5 years", chestCm: [53, 56], heightCm: [96, 110] },
  { size: "5-6Y / 6-7Y", age: "5 – 7 years", chestCm: [57, 60], heightCm: [111, 122] },
  { size: "7-8Y / 8-9Y", age: "7 – 9 years", chestCm: [61, 64], heightCm: [123, 134] },
  { size: "9-10Y / 10-12Y", age: "9 – 12 years", chestCm: [65, 70], heightCm: [135, 152] },
  { size: "12-14Y", age: "12 – 14 years", chestCm: [71, 78], heightCm: [153, 164] },
];

function cmToIn(cm: number): string {
  return (cm / 2.54).toFixed(1);
}

function formatRange(range: number[], unit: "cm" | "in"): string {
  if (unit === "cm") return `${range[0]}-${range[1]} cm`;
  return `${cmToIn(range[0])}-${cmToIn(range[1])} in`;
}

export default function SizeGuideTable() {
  const [unit, setUnit] = useState<"cm" | "in">("cm");

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-sm text-ink-soft">Measurements are approximate. We recommend sizing up for growing children.</p>
        <div className="flex shrink-0 rounded-full border border-line p-0.5">
          {(["cm", "in"] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                unit === u ? "bg-ink text-ivory" : "text-ink-soft hover:text-ink"
              )}
            >
              {u === "cm" ? "CM" : "Inches"}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-soft">
              <th className="py-2 pr-4">Size</th>
              <th className="py-2 pr-4">Age</th>
              <th className="py-2 pr-4">Chest</th>
              <th className="py-2">Height</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.size} className="border-b border-line/70">
                <td className="py-2.5 pr-4 font-medium text-ink">{r.size}</td>
                <td className="py-2.5 pr-4 text-ink-soft">{r.age}</td>
                <td className="py-2.5 pr-4 text-ink-soft">{formatRange(r.chestCm, unit)}</td>
                <td className="py-2.5 text-ink-soft">{formatRange(r.heightCm, unit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
