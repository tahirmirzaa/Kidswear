import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useToast } from "../../context/ToastContext";
import { LAUNCH_SIGNUPS_KEY, CONSENT_VERSION, CONSENT_TEXT, hasSignedUp, type LaunchSignupRecord } from "../../lib/launchSignups";
import Input from "../ui/Input";
import Button from "../ui/Button";

// WAIT-01: record what the visitor actually agreed to (wording + version)
// and when, not just the bare email, so the consent is auditable later. No
// email provider is wired up yet, so this still only writes to localStorage;
// a real destination is an owner/infra decision, not something to fabricate.
export default function LaunchSignup() {
  const [signups, setSignups] = useLocalStorage<LaunchSignupRecord[]>(LAUNCH_SIGNUPS_KEY, []);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    if (!consent) {
      setError("Please confirm you'd like to hear from us");
      return;
    }
    if (hasSignedUp(signups, email)) {
      setError("You're already on the list");
      return;
    }
    setSignups((prev) => [...prev, { email, consentText: CONSENT_TEXT, consentVersion: CONSENT_VERSION, date: new Date().toISOString() }]);
    setEmail("");
    setConsent(false);
    setError("");
    showToast("You're on the list! We'll email you at launch.");
  };

  return (
    <section id="notify-me" className="border-t border-line bg-ivory-dark/40 py-6 sm:py-7">
      <div className="container-page flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="shrink-0">
          <h2 className="font-serif text-lg text-ink sm:text-xl">Notify Me at Launch</h2>
          <p className="text-xs text-ink-soft">Be the first to know when we open for orders.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-1.5 sm:w-auto">
          <div className="flex w-full gap-2">
            <Input
              aria-label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              wrapperClassName="min-w-0 flex-1 sm:w-56"
            />
            <Button type="submit" variant="primary" size="md" className="shrink-0">
              Notify Me
            </Button>
          </div>
          <label className="flex items-start gap-1.5 text-left text-[11px] text-ink-soft">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded border-line accent-burgundy"
            />
            {CONSENT_TEXT}
          </label>
          {error && <p role="alert" className="text-left text-xs text-sale">{error}</p>}
        </form>
      </div>
    </section>
  );
}
