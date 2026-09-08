import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = "Enter a valid email address";
    if (password.length < 6) nextErrors.password = "Password must be at least 6 characters";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    login(email);
    showToast("Welcome back!");
    navigate("/account");
  };

  return (
    <div className="container-page flex justify-center py-16">
      <div className="w-full max-w-sm">
        <img src="/brand/panda-in-p.png" alt="" className="mx-auto h-14 w-auto" />
        <h1 className="mt-4 text-center font-serif text-3xl text-ink">Welcome Back</h1>
        <p className="mt-2 text-center text-sm text-ink-soft">Log in to track orders, manage your wishlist and more.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@example.com" />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} placeholder="••••••••" />
          <Button type="submit" variant="primary" size="lg" fullWidth className="mt-2">
            Log In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          New to Pip & Panda?{" "}
          <Link to="/register" className="font-medium text-burgundy">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
