import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Landmark, Truck, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/ui/Breadcrumb";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { formatINR } from "../lib/utils";
import type { Address } from "../types";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

type PaymentMethod = "card" | "upi";

export default function Checkout() {
  useDocumentMeta({ title: "Checkout | Pip & Panda", noindex: true });
  const { lines, subtotal } = useCart();

  const [address, setAddress] = useState<Omit<Address, "id" | "type">>({
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [payment, setPayment] = useState<PaymentMethod>("card");

  if (lines.length === 0) {
    return (
      <div className="container-page py-8">
        <EmptyState icon={<ShoppingBag size={30} />} title="Your bag is empty" description="Add a few items before checking out." ctaLabel="Start Shopping" ctaTo="/new-arrivals" />
      </div>
    );
  }

  const shipping = subtotal >= 1499 ? 0 : 79;
  const total = subtotal + shipping;

  const handleChange = (field: keyof typeof address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNumericChange = (field: "phone" | "pincode", maxLength: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    setAddress((prev) => ({ ...prev, [field]: digitsOnly }));
  };

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: "Shopping Bag", to: "/bag" }, { label: "Checkout" }]} />
      <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="mb-4 font-serif text-xl text-ink">Delivery Address</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Full Name" value={address.fullName} onChange={handleChange("fullName")} />
              <Input
                label="Phone Number"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={address.phone}
                onChange={handleNumericChange("phone", 10)}
                placeholder="10-digit mobile number"
              />
              <Input label="Address Line 1" wrapperClassName="sm:col-span-2" value={address.line1} onChange={handleChange("line1")} placeholder="House no., building, street" />
              <Input label="Address Line 2 (Optional)" wrapperClassName="sm:col-span-2" value={address.line2} onChange={handleChange("line2")} placeholder="Landmark, area" />
              <Input label="City" value={address.city} onChange={handleChange("city")} />
              <Input label="State" value={address.state} onChange={handleChange("state")} />
              <Input
                label="Pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={address.pincode}
                onChange={handleNumericChange("pincode", 6)}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-1 font-serif text-xl text-ink">Payment Method</h2>
            <p className="mb-4 text-xs text-ink-soft">We accept prepaid payments only. Cash on Delivery is not available.</p>
            <div className="flex flex-col gap-3">
              {[
                { id: "card" as const, label: "Credit / Debit Card", icon: <CreditCard size={18} /> },
                { id: "upi" as const, label: "UPI", icon: <Landmark size={18} /> },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm ${
                    payment === opt.id ? "border-ink bg-ivory-dark/50" : "border-line"
                  }`}
                >
                  <input type="radio" name="payment" checked={payment === opt.id} onChange={() => setPayment(opt.id)} className="accent-burgundy" />
                  {opt.icon}
                  {opt.label}
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="h-fit rounded-2xl border border-line p-6">
          <h2 className="font-serif text-xl text-ink">Order Summary</h2>
          <div className="mt-4 flex flex-col divide-y divide-line">
            {lines.map((l) => (
              <div key={`${l.productId}-${l.size}-${l.color}`} className="flex gap-3 py-3 first:pt-0 last:pb-0 text-sm">
                <div className="h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-ivory-dark">
                  <img src={l.product.images[0]} alt={l.product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 items-start justify-between gap-3">
                  <div>
                    <p className="text-ink-soft">{l.product.name}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {l.size} · {l.color} · Qty {l.quantity}
                    </p>
                  </div>
                  <span className="shrink-0 font-medium text-ink">{formatINR((l.product.discountPrice ?? l.product.price) * l.quantity)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal (tax-inclusive)</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span className="flex items-center gap-1.5"><Truck size={14} /> Delivery Charge</span>
              <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
            <div className="mt-1 flex justify-between border-t border-line pt-3 text-base font-semibold text-ink">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
          <Button variant="primary" fullWidth size="lg" className="mt-5" disabled title="We are not accepting orders at the moment">
            Coming Soon
          </Button>
          <p className="mt-3 text-center text-xs text-ink-soft">
            We're launching soon. Orders can't be placed just yet, please check back later.
          </p>
          <Link to="/bag" className="mt-3 block text-center text-xs font-medium text-ink underline underline-offset-4">
            Back to bag
          </Link>
        </div>
      </div>
    </div>
  );
}
