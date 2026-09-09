import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Product } from "../../types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useToast } from "../../context/ToastContext";
import { LAUNCH_SIGNUPS_KEY, CONSENT_VERSION, CONSENT_TEXT, hasSignedUp, type LaunchSignupRecord } from "../../lib/launchSignups";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface ProductInterest {
  email: string;
  productId: string;
  size: string;
  color: string;
  date: string;
}

// CART-01: prelaunch product pages must not invite a purchase journey that
// dead-ends at a disabled checkout. This replaces Add to Bag / Buy Now with a
// product+size-specific launch notification, recorded locally alongside the
// sitewide launch signup list (not a separate, wider campaign).
export default function NotifyMe({ product, size, color, disabled }: { product: Product; size: string | null; color: string; disabled?: boolean }) {
  const [savedEmail, setSavedEmail] = useLocalStorage("ta-notify-email", "");
  const [interest, setInterest] = useLocalStorage<ProductInterest[]>("ta-product-interest", []);
  const [launchSignups, setLaunchSignups] = useLocalStorage<LaunchSignupRecord[]>(LAUNCH_SIGNUPS_KEY, []);
  const [email, setEmail] = useState(savedEmail);
  const [error, setError] = useState("");
  const [justSubmitted, setJustSubmitted] = useState(false);
  const { showToast } = useToast();

  const alreadyNotified =
    justSubmitted || interest.some((i) => i.productId === product.id && i.size === size && i.email.toLowerCase() === (savedEmail || email).toLowerCase());

  if (disabled) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-line bg-ivory-dark py-3.5 text-sm font-medium text-ink-soft">
        Currently Out of Stock
      </div>
    );
  }

  if (alreadyNotified && size) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-line bg-sage/30 py-3.5 text-sm font-medium text-ink">
        <CheckCircle2 size={16} className="text-burgundy" /> We'll email you when this is ready to order
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!size) {
      setError("Please select a size first");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setSavedEmail(email);
    setInterest((prev) => [...prev, { email, productId: product.id, size, color, date: new Date().toISOString() }]);
    if (!hasSignedUp(launchSignups, email)) {
      setLaunchSignups((prev) => [...prev, { email, consentText: CONSENT_TEXT, consentVersion: CONSENT_VERSION, date: new Date().toISOString() }]);
    }
    setJustSubmitted(true);
    showToast(`We'll email you when ${product.name} is ready to order.`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          aria-label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          wrapperClassName="flex-1"
        />
        <Button type="submit" variant="primary" size="lg" className="shrink-0">
          Notify Me at Launch
        </Button>
      </div>
      {error && <p role="alert" className="text-xs text-sale">{error}</p>}
    </form>
  );
}
