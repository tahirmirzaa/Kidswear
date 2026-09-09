// Shared shape for the single "launch notification" list, written to by both
// the homepage signup form and the per-product Notify Me action (WAIT-01:
// don't fragment these into separate/wider lists than what was consented to).
export const LAUNCH_SIGNUPS_KEY = "ta-launch-signups-v2";
export const CONSENT_VERSION = "v1";
export const CONSENT_TEXT = "I'd like to receive an email when Pip & Panda launches.";

export interface LaunchSignupRecord {
  email: string;
  consentText: string;
  consentVersion: string;
  date: string;
}

export function hasSignedUp(signups: LaunchSignupRecord[], email: string): boolean {
  return signups.some((s) => s.email.toLowerCase() === email.toLowerCase());
}
