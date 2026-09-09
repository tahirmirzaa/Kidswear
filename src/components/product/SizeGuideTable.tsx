import { launchSizes } from "../../data/taxonomy";

// SIZE-01: the previous table grouped sizes (e.g. "1-2Y / 2-3Y") and listed
// chest/height figures that no supplier ever confirmed for our garments. Each
// sellable launch size now gets its own row, and no measurement numbers are
// shown until supplier-approved samples provide real, garment-specific data.
export default function SizeGuideTable() {
  return (
    <div>
      <p className="text-sm text-ink-soft">
        Detailed chest, length and waist measurements for each size will be published once supplier samples are
        approved. In the meantime, here are the sizes available in our launch range.
      </p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-soft">
              <th className="py-2 pr-4">Size</th>
              <th className="py-2">Suggested Age</th>
            </tr>
          </thead>
          <tbody>
            {launchSizes.map((s) => (
              <tr key={s.slug} className="border-b border-line/70">
                <td className="py-2.5 pr-4 font-medium text-ink">{s.label}</td>
                <td className="py-2.5 text-ink-soft">{s.label.replace("Y", "")} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-ink-soft">
        Every child grows differently. If your child is between sizes, we recommend sizing up.
      </p>
    </div>
  );
}
