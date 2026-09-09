import { useState } from "react";
import { Search } from "lucide-react";
import Breadcrumb from "../components/ui/Breadcrumb";
import Accordion, { AccordionItem } from "../components/ui/Accordion";
import { faqs } from "../data/content";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function FAQs() {
  useDocumentMeta({
    title: "FAQs | Pip & Panda",
    description: "Answers to common questions about orders, payment, shipping, returns and sizing at Pip & Panda.",
  });

  const [query, setQuery] = useState("");

  const filtered = faqs
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => item.q.toLowerCase().includes(query.toLowerCase()) || item.a.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: "FAQs" }]} />
      <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Frequently Asked Questions</h1>

      <div className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-line px-4 py-2.5">
        <Search size={16} className="text-ink-soft" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search FAQs..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-soft/50"
        />
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {filtered.length === 0 && <p className="text-sm text-ink-soft">No results found for "{query}"</p>}
        {filtered.map((section) => (
          <div key={section.category}>
            <h2 className="mb-2 font-serif text-xl text-ink">{section.category}</h2>
            <Accordion>
              {section.items.map((item) => (
                <AccordionItem key={item.q} title={item.q}>
                  {item.a}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
