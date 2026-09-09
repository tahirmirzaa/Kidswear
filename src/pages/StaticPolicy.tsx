import Breadcrumb from "../components/ui/Breadcrumb";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

interface StaticPolicyProps {
  title: string;
  paragraphs: string[];
}

export default function StaticPolicy({ title, paragraphs }: StaticPolicyProps) {
  useDocumentMeta({ title: `${title} | Pip & Panda`, description: `${title} for the Pip & Panda website.` });

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: title }]} />
      <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">{title}</h1>
      <div className="mt-6 flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-ink-soft">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <StaticPolicy
      title="Privacy Policy"
      paragraphs={[
        "Pip & Panda respects your privacy. We collect only the information necessary to process your orders, improve your shopping experience, and communicate with you about products and offers you've opted into.",
        "We never sell your personal information to third parties. No payment processor is integrated yet, as ordering is not currently enabled; no payment details are collected.",
        "Account details, wishlist, bag contents and launch signup information are currently stored only in your own browser, not on a server. We use Vercel Analytics and Speed Insights to understand anonymous, aggregate site usage.",
        "You may request access to, correction of, or deletion of your personal data at any time by writing to care@pipandpanda.in.",
        "This is a prelaunch storefront: catalogue, account and signup features are live, but ordering is not yet enabled.",
      ]}
    />
  );
}

export function Terms() {
  return (
    <StaticPolicy
      title="Terms of Service"
      paragraphs={[
        "By using the Pip & Panda website, you agree to these terms. All product information, pricing, and availability are subject to change without notice.",
        "Prices listed are in Indian Rupees (INR) and inclusive of applicable taxes unless stated otherwise.",
        "All content on this site, including images, text, and branding, belongs to Pip & Panda and may not be reproduced without permission.",
        "This is a prelaunch storefront and does not process real transactions yet; ordering will open once the site is fully ready.",
      ]}
    />
  );
}
