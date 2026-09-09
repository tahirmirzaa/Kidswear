import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Package, Heart, MapPin, LogOut, Pencil } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { useWishlist } from "../context/WishlistContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Breadcrumb from "../components/ui/Breadcrumb";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import type { Address } from "../types";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Account() {
  useDocumentMeta({ title: "My Account | Pip & Panda", noindex: true });
  const { user, logout, updateProfile } = useAuth();
  const { orders } = useOrders();
  const { products } = useWishlist();
  const [addresses] = useLocalStorage<Address[]>("ta-addresses", []);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-20 text-center">
        <User size={30} className="text-ink-soft" />
        <h1 className="font-serif text-3xl text-ink">You're not logged in</h1>
        <p className="max-w-sm text-sm text-ink-soft">Log in to view your orders, wishlist and saved addresses.</p>
        <div className="mt-2 flex gap-3">
          <Link to="/login">
            <Button variant="primary">Log In</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline">Create Account</Button>
          </Link>
        </div>
      </div>
    );
  }

  const startEditing = () => {
    setForm({ name: user.name, email: user.email, phone: user.phone ?? "" });
    setErrors({});
    setEditing(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your full name";
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email address";
    if (form.phone && !/^\d{10}$/.test(form.phone)) next.phone = "Enter a valid 10-digit phone number";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    updateProfile({ name: form.name.trim(), email: form.email.trim(), phone: form.phone || undefined });
    setEditing(false);
  };

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: "My Account" }]} />
      <h1 className="mt-4 font-serif text-3xl capitalize text-ink sm:text-4xl">Hi, {user.name}</h1>
      <p className="mt-1 text-sm text-ink-soft">Manage your profile, orders, wishlist and addresses.</p>

      <div className="mt-8 rounded-2xl border border-line p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-xl text-ink">Profile Details</h2>
          {!editing && (
            <button
              onClick={startEditing}
              className="flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-burgundy hover:underline"
            >
              <Pencil size={13} /> Edit
            </button>
          )}
        </div>

        {editing ? (
          <div className="mt-5 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Full Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} error={errors.name} />
              <Input label="Email Address" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} error={errors.email} />
              <Input
                label="Phone Number (Optional)"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={form.phone}
                onChange={handlePhoneChange}
                error={errors.phone}
                placeholder="10-digit mobile number"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="primary" size="sm" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Name</p>
              <p className="mt-1 text-sm text-ink">{user.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Email</p>
              <p className="mt-1 text-sm text-ink">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Phone</p>
              <p className="mt-1 text-sm text-ink">{user.phone || "Not added"}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Link to="/orders/track" className="flex flex-col gap-2 rounded-2xl border border-line p-6 hover:border-ink">
          <Package size={20} className="text-burgundy" />
          <p className="font-semibold text-ink">Orders</p>
          <p className="text-sm text-ink-soft">{orders.length} orders placed</p>
        </Link>
        <Link to="/wishlist" className="flex flex-col gap-2 rounded-2xl border border-line p-6 hover:border-ink">
          <Heart size={20} className="text-burgundy" />
          <p className="font-semibold text-ink">Wishlist</p>
          <p className="text-sm text-ink-soft">{products.length} items saved</p>
        </Link>
        <Link to="/addresses" className="flex flex-col gap-2 rounded-2xl border border-line p-6 hover:border-ink">
          <MapPin size={20} className="text-burgundy" />
          <p className="font-semibold text-ink">Addresses</p>
          <p className="text-sm text-ink-soft">{addresses.length} saved addresses</p>
        </Link>
      </div>

      <div className="mt-10 flex justify-center border-t border-line pt-8">
        <Button variant="outline" size="sm" icon={<LogOut size={14} />} onClick={logout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}
