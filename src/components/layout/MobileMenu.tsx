import { Link } from "react-router-dom";
import Drawer from "../ui/Drawer";
import { mainNav } from "../../data/taxonomy";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} title="Menu" side="left" widthClass="max-w-xs">
      <nav className="flex flex-col p-2">
        {mainNav.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={onClose}
            className="border-b border-line px-4 py-3.5 text-sm font-medium text-ink"
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-4 flex flex-col gap-1 px-4 text-sm text-ink-soft">
          <Link to="/account" onClick={onClose} className="py-2">My Account</Link>
          <Link to="/orders/track" onClick={onClose} className="py-2">Track Order</Link>
          <Link to="/about" onClick={onClose} className="py-2">About Us</Link>
          <Link to="/contact" onClick={onClose} className="py-2">Contact Us</Link>
          <Link to="/faqs" onClick={onClose} className="py-2">FAQs</Link>
        </div>
      </nav>
    </Drawer>
  );
}
