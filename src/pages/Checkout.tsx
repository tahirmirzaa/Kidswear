import { useState } from "react";
import { CreditCard, Landmark, Wallet, Truck, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/ui/Breadcrumb";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { formatINR } from "../lib/utils";
import type { Address } from "../types";

type PaymentMethod = "card" | "upi" | "cod";

export default function Checkout() {
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
            <h2 className="mb-4 font-serif text-xl text-ink">Payment Method</h2>
            <div className="flex flex-col gap-3">
              {[
                { id: "card" as const, label: "Credit / Debit Card", icon: <CreditCard size={18} /> },
                { id: "upi" as const, label: "UPI", icon: <Landmark size={18} /> },
                { id: "cod" as const, label: "Cash on Delivery", icon: <Wallet size={18} /> },
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
              <div key={`${l.productId}-${l.size}-${l.color}`} className="flex justify-between gap-3 pt-3 first:pt-0 text-sm">
                <span className="text-ink-soft">
                  {l.product.name} × {l.quantity}
                </span>
                <span className="font-medium text-ink">{formatINR((l.product.discountPrice ?? l.product.price) * l.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span className="flex items-center gap-1.5"><Truck size={14} /> Shipping</span>
              <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
            <div className="mt-1 flex justify-between border-t border-line pt-3 text-base font-semibold text-ink">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
          <Button variant="primary" fullWidth size="lg" className="mt-5" disabled title="We are not accepting orders at the moment">
            Not Accepting Orders Currently
          </Button>
          <p className="mt-3 text-center text-xs text-ink-soft">
            We're launching soon. Orders can't be placed just yet, please check back later.
          </p>
        </div>
      </div>
    </div>
  );
}
