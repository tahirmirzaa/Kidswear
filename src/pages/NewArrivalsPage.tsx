import ProductListing from "../components/product/ProductListing";
import { launchProducts } from "../data/products";

export default function NewArrivalsPage() {
  return (
    <ProductListing
      title="Shop All"
      description="Our full launch range: cotton Everyday Sets and Nightwear for ages 2-6."
      breadcrumbLabel="Shop All"
      products={launchProducts}
    />
  );
}
