import ProductListing from "../components/product/ProductListing";
import { saleProducts } from "../data/products";

export default function SalePage() {
  return (
    <ProductListing
      title="Sale"
      description="A few launch styles at a little less."
      breadcrumbLabel="Sale"
      products={saleProducts}
    />
  );
}
