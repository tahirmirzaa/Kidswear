import { useState } from "react";
import { MapPin, CheckCircle2, XCircle } from "lucide-react";
import Button from "../ui/Button";

export default function PincodeCheck() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<"available" | "unavailable" | null>(null);

  const handleCheck = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setResult(null);
      return;
    }
    const lastDigit = Number(pincode[5]);
    setResult(lastDigit % 5 === 0 ? "unavailable" : "available");
  };

  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink">
        <MapPin size={14} /> Check Delivery
      </p>
      <div className="flex gap-2">
        <input
          value={pincode}
          inputMode="numeric"
          maxLength={6}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
            setResult(null);
          }}
          placeholder="Enter pincode"
          className="min-w-0 flex-1 rounded-lg border border-line px-3 py-2 text-sm focus:border-burgundy"
        />
        <Button variant="outline" size="sm" className="shrink-0" onClick={handleCheck}>
          Check
        </Button>
      </div>
      {result === "available" && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-sage-dark">
          <CheckCircle2 size={14} /> Delivery available, usually arrives in 3-5 days.
        </p>
      )}
      {result === "unavailable" && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-sale">
          <XCircle size={14} /> Currently not deliverable to this pincode.
        </p>
      )}
    </div>
  );
}
