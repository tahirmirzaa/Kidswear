import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Pencil, Trash2, Plus, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Breadcrumb from "../components/ui/Breadcrumb";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import EmptyState from "../components/ui/EmptyState";
import type { Address } from "../types";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

type AddressType = Address["type"];

const emptyForm: Omit<Address, "id"> = {
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
  type: "Home",
};

export default function Addresses() {
  useDocumentMeta({ title: "My Addresses | Pip & Panda", noindex: true });
  const { user } = useAuth();
  const [addresses, setAddresses] = useLocalStorage<Address[]>("ta-addresses", []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Address, "id">>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-20 text-center">
        <User size={30} className="text-ink-soft" />
        <h1 className="font-serif text-3xl text-ink">You're not logged in</h1>
        <p className="max-w-sm text-sm text-ink-soft">Log in to view and manage your saved addresses.</p>
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

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setEditingId(address.id);
    const { id: _id, ...rest } = address;
    setForm(rest);
    setErrors({});
    setModalOpen(true);
  };

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNumericChange = (field: "phone" | "pincode", maxLength: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    setForm((prev) => ({ ...prev, [field]: digitsOnly }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Required";
    if (!form.line1.trim()) next.line1 = "Required";
    if (!form.city.trim()) next.city = "Required";
    if (!form.state.trim()) next.state = "Required";
    if (!/^\d{6}$/.test(form.pincode)) next.pincode = "Enter a valid 6-digit pincode";
    if (!/^\d{10}$/.test(form.phone)) next.phone = "Enter a valid 10-digit phone number";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editingId) {
      setAddresses((prev) => prev.map((a) => (a.id === editingId ? { ...form, id: editingId } : a)));
    } else {
      setAddresses((prev) => [...prev, { ...form, id: `addr-${Date.now()}` }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: "My Account", to: "/account" }, { label: "Addresses" }]} />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">My Addresses</h1>
        <Button variant="primary" size="sm" icon={<Plus size={14} />} onClick={openAddModal}>
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            icon={<MapPin size={30} />}
            title="No saved addresses"
            description="Add an address to make checkout faster next time."
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map((a) => (
            <div key={a.id} className="flex flex-col gap-3 rounded-2xl border border-line p-6">
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex w-fit items-center rounded-full bg-ivory-dark px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {a.type}
                </span>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => openEditModal(a)}
                    aria-label="Edit address"
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-ivory-dark"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    aria-label="Delete address"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sale hover:bg-ivory-dark"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div>
                <p className="font-semibold text-ink">{a.fullName}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {a.line1}
                  {a.line2 ? `, ${a.line2}` : ""}, {a.city}, {a.state} - {a.pincode}
                </p>
                <p className="mt-1 text-sm text-ink-soft">Phone: {a.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} maxWidthClass="max-w-xl">
        <h2 className="font-serif text-2xl text-ink">{editingId ? "Edit Address" : "Add New Address"}</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Full Name" value={form.fullName} onChange={handleChange("fullName")} error={errors.fullName} />
          <Input
            label="Phone Number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={form.phone}
            onChange={handleNumericChange("phone", 10)}
            error={errors.phone}
            placeholder="10-digit mobile number"
          />
          <Input label="Address Line 1" wrapperClassName="sm:col-span-2" value={form.line1} onChange={handleChange("line1")} error={errors.line1} placeholder="House no., building, street" />
          <Input label="Address Line 2 (Optional)" wrapperClassName="sm:col-span-2" value={form.line2} onChange={handleChange("line2")} placeholder="Landmark, area" />
          <Input label="City" value={form.city} onChange={handleChange("city")} error={errors.city} />
          <Input label="State" value={form.state} onChange={handleChange("state")} error={errors.state} />
          <Input
            label="Pincode"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={form.pincode}
            onChange={handleNumericChange("pincode", 6)}
            error={errors.pincode}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink">Address Type</label>
            <div className="flex gap-2">
              {(["Home", "Work", "Other"] as AddressType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, type: t }))}
                  className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
                    form.type === t ? "border-ink bg-ink text-ivory" : "border-line text-ink-soft hover:border-ink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Button variant="primary" fullWidth size="lg" className="mt-6" onClick={handleSave}>
          {editingId ? "Save Changes" : "Add Address"}
        </Button>
      </Modal>
    </div>
  );
}
