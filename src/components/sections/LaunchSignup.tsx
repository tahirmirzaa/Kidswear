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
    <section id="notify-me" className="border-t border-line bg-ivory-dark/40 py-14 sm:py-20">
      <div className="container-page flex flex-col items-center text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">Stay in the Loop</span>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Notify Me at Launch</h2>
        <p className="mt-2 max-w-md text-sm text-ink-soft">
          Be the first to know when we open for orders. No spam, just one email when we launch.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md flex-col gap-2">
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Input
              aria-label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              wrapperClassName="flex-1"
            />
            <Button type="submit" variant="primary" size="lg" className="shrink-0">
              Notify Me
            </Button>
          </div>
          <label className="flex items-start gap-2.5 text-left text-xs text-ink-soft">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-line accent-burgundy"
            />
            {CONSENT_TEXT}
          </label>
          {error && <p role="alert" className="text-left text-xs text-sale">{error}</p>}
        </form>
      </div>
    </section>
  );
}
