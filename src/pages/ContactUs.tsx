import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Breadcrumb from "../components/ui/Breadcrumb";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function ContactUs() {
  useDocumentMeta({
    title: "Contact Us | Pip & Panda",
    description: "Get in touch with Pip & Panda for questions, feedback, or support.",
  });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { showToast } = useToast();

  // TRUST-01: this used to show a fake "sent" toast with no real destination.
  // With no form backend or email API configured yet, opening a pre-filled
  // mailto draft is the one option that's honest about what actually happens.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Website enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:care@pipandpanda.in?subject=${subject}&body=${body}`;
    showToast("Opening your email app to send this to our team.");
  };

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: "Contact Us" }]} />
      <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Contact Us</h1>
      <p className="mt-2 max-w-md text-sm text-ink-soft">We'd love to hear from you: questions, feedback, or just to say hi.</p>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-ink">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-burgundy"
              placeholder="How can we help?"
            />
          </div>
          <Button type="submit" variant="primary" size="lg" className="mt-2 self-start">
            Send Message
          </Button>
        </form>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-0.5 text-burgundy" />
            <div>
              <p className="text-sm font-semibold text-ink">Call Us</p>
              <p className="text-sm text-ink-soft">+91 98765 43210</p>
              <p className="text-xs text-ink-soft">Mon–Sat, 10am – 7pm IST</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 text-burgundy" />
            <div>
              <p className="text-sm font-semibold text-ink">Email Us</p>
              <p className="text-sm text-ink-soft">care@pipandpanda.in</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 text-burgundy" />
            <div>
              <p className="text-sm font-semibold text-ink">Studio Address</p>
              <p className="text-sm text-ink-soft">4th Floor, Fern Studio, Lower Parel, Mumbai, Maharashtra 400013</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} className="mt-0.5 text-burgundy" />
            <div>
              <p className="text-sm font-semibold text-ink">Response Time</p>
              <p className="text-sm text-ink-soft">We usually reply within 24 hours on business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
