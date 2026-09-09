import Breadcrumb from "../components/ui/Breadcrumb";
import SizeGuideTable from "../components/product/SizeGuideTable";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function SizeGuide() {
  useDocumentMeta({
    title: "Kids' Size Guide: Ages 2-6 | Pip & Panda",
    description: "Find the right size across Pip & Panda's Everyday Sets and Nightwear range for children aged 2-6.",
  });

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: "Size Guide" }]} />
      <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Size Guide</h1>
      <p className="mt-2 max-w-md text-sm text-ink-soft">
        Find the right fit across our Everyday Sets and Nightwear range.
      </p>
      <div className="mt-8 max-w-2xl">
        <SizeGuideTable />
      </div>
    </div>
  );
}
