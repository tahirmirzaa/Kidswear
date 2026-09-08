import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (name.trim().length < 2) nextErrors.name = "Please enter your full name";
    if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = "Enter a valid email address";
    if (password.length < 6) nextErrors.password = "Password must be at least 6 characters";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    register(name, email);
    showToast(`Welcome to Pip & Panda, ${name.split(" ")[0]}!`);
    navigate("/account");
  };

  return (
    <div className="container-page flex justify-center py-16">
      <div className="w-full max-w-sm">
        <img src="/brand/panda-in-p.png" alt="" className="mx-auto h-14 w-auto" />
        <h1 className="mt-4 text-center font-serif text-3xl text-ink">Create Your Account</h1>
        <p className="mt-2 text-center text-sm text-ink-soft">Join for early access to new arrivals and 10% off your first order.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} placeholder="Priya Sharma" />
          <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@example.com" />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} placeholder="••••••••" />
          <Button type="submit" variant="primary" size="lg" fullWidth className="mt-2">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-burgundy">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
