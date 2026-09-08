import { launchProducts } from "../../data/products";
import SectionHeading from "../ui/SectionHeading";
import ProductGrid from "../product/ProductGrid";

export default function FeaturedProducts() {
  const featured = launchProducts.slice(0, 4);

  return (
    <section className="container-page py-14 sm:py-20">
      <SectionHeading
        eyebrow="Launch Range"
        title="Meet the First Collection"
        description="Real pieces from our very first drop, ready for everyday wear."
        ctaLabel="Shop All"
        ctaTo="/new-arrivals"
      />
      <ProductGrid products={featured} />
    </section>
  );
}
