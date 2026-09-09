import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Button from "../components/ui/Button";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

// AUTH-01: the previous flow verified an email address and let anyone set a
// new password with no proof they own that inbox. With no email provider
// wired up yet to issue a real single-use reset link, the safe option is to
// not offer self-service reset at all, and route to a human instead.
export default function ForgotPassword() {
  useDocumentMeta({ title: "Reset Password | Pip & Panda", noindex: true });

  return (
    <div className="container-page flex justify-center py-16">
      <div className="w-full max-w-sm text-center">
        <img src="/brand/panda-in-p.png" alt="" className="mx-auto h-14 w-auto" />
        <h1 className="mt-4 font-serif text-3xl text-ink">Reset Password</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Self-service password reset isn't available yet. Contact our support team and we'll help you regain
          access to your account.
        </p>

        <a href="mailto:care@pipandpanda.in?subject=Password reset request">
          <Button variant="primary" size="lg" fullWidth className="mt-6" icon={<Mail size={16} />}>
            Email care@pipandpanda.in
          </Button>
        </a>

        <p className="mt-6 text-sm text-ink-soft">
          <Link to="/login" className="font-medium text-burgundy">
            Back to log in
          </Link>
        </p>
      </div>
    </div>
  );
}
