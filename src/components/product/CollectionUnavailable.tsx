import { PackageSearch } from "lucide-react";
import EmptyState from "../ui/EmptyState";

export default function CollectionUnavailable() {
  return (
    <div className="container-page py-16">
      <EmptyState
        icon={<PackageSearch size={30} />}
        title="Not part of our launch range yet"
        description="This collection isn't available while we're preparing to launch. Browse Everyday Sets and Nightwear instead."
        ctaLabel="Browse Everyday Sets"
        ctaTo="/category/everyday-sets"
      />
    </div>
  );
}
