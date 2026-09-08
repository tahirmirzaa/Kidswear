import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const columns = [
  {
    title: "Customer Support",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "FAQs", to: "/faqs" },
      { label: "Track Your Order", to: "/orders/track" },
      { label: "Size Guide", to: "/size-guide" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Shipping Policy", to: "/shipping-returns" },
      { label: "Returns & Exchanges", to: "/shipping-returns" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Sale", to: "/sale" },
      { label: "Shop All", to: "/new-arrivals" },
    ],
  },
];

function FooterColumn({ title, links }: (typeof columns)[number]) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line py-4 lg:border-none lg:py-0">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-sm font-bold uppercase tracking-wide text-ink lg:pointer-events-none lg:text-xs lg:font-semibold"
      >
        {title}
        <ChevronDown size={16} className={cn("transition-transform duration-200 lg:hidden", open && "rotate-180")} />
      </button>
      <ul className={cn("flex flex-col gap-2 overflow-hidden transition-all lg:mt-3 lg:max-h-none lg:overflow-visible", open ? "mt-3 max-h-96" : "max-h-0")}>
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-ink-soft hover:text-burgundy">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ivory-dark/60">
      <div className="container-page py-4 lg:py-12">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {columns.map((col) => (
            <FooterColumn key={col.title} {...col} />
          ))}
        </div>

        <div className="mt-4 border-t border-line pt-6 text-center text-xs text-ink-soft lg:mt-10">
          <p>© 2026 Pip & Panda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
