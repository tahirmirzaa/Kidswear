import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setEmailVerified(true);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!resetPassword(email, password)) {
      setError("We couldn't find an account with that email");
      return;
    }
    showToast("Password updated. Please log in.");
    navigate("/login");
  };

  return (
    <div className="container-page flex justify-center py-16">
      <div className="w-full max-w-sm">
        <img src="/brand/panda-in-p.png" alt="" className="mx-auto h-14 w-auto" />
        <h1 className="mt-4 text-center font-serif text-3xl text-ink">Reset Password</h1>
        <p className="mt-2 text-center text-sm text-ink-soft">
          {emailVerified
            ? "Choose a new password for your account."
            : "This is a demo storefront with no email service, so we'll verify your email directly and let you set a new password here."}
        </p>

        {emailVerified ? (
          <form onSubmit={handleReset} className="mt-8 flex flex-col gap-4">
            <PasswordInput label="New Password" value={password} onChange={(e) => setPassword(e.target.value)} error={error} placeholder="••••••••" />
            <Button type="submit" variant="primary" size="lg" fullWidth className="mt-2">
              Update Password
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyEmail} className="mt-8 flex flex-col gap-4">
            <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} placeholder="you@example.com" />
            <Button type="submit" variant="primary" size="lg" fullWidth className="mt-2">
              Continue
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-ink-soft">
          <Link to="/login" className="font-medium text-burgundy">
            Back to log in
          </Link>
        </p>
      </div>
    </div>
  );
}
