import { Truck, RotateCcw, ShieldCheck, Clock } from "lucide-react";
import Breadcrumb from "../components/ui/Breadcrumb";

const sections = [
  {
    icon: <Truck size={20} />,
    title: "Shipping Policy",
    points: [
      "We deliver to over 500 cities and towns across India.",
      "Standard delivery takes 3–6 business days; metro cities typically see 2–4 days.",
      "Free shipping on all prepaid orders above ₹1,499. A flat ₹79 fee applies below this amount.",
      "You'll receive tracking details via SMS and email once your order ships.",
    ],
  },
  {
    icon: <RotateCcw size={20} />,
    title: "Returns & Exchanges",
    points: [
      "Easy 15-day return and exchange window from the date of delivery.",
      "Items must be unworn, unwashed, and returned with original tags attached.",
      "Free pickup is arranged from your delivery address for eligible returns.",
      "Occasion wear and accessories marked 'Final Sale' are not eligible for return.",
    ],
  },
  {
    icon: <Clock size={20} />,
    title: "Refund Timeline",
    points: [
      "Refunds are processed within 5–7 business days after the item passes quality check.",
      "Amount is credited to the original payment method, or as store credit for COD orders.",
      "You'll receive a confirmation email once your refund has been processed.",
    ],
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Quality Guarantee",
    points: [
      "Every item is quality-checked before it leaves our fulfilment centre.",
      "If you receive a damaged or incorrect item, contact us within 48 hours for a free replacement.",
    ],
  },
];

export default function ShippingReturns() {
  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: "Shipping & Returns" }]} />
      <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Shipping & Returns</h1>
      <p className="mt-2 max-w-md text-sm text-ink-soft">Everything you need to know about receiving and returning your order.</p>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {sections.map((s) => (
          <div key={s.title} className="rounded-2xl border border-line p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/40 text-burgundy">{s.icon}</div>
              <h2 className="font-serif text-xl text-ink">{s.title}</h2>
            </div>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-ink-soft">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
