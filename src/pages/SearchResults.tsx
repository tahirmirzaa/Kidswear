import { useSearchParams } from "react-router-dom";
import ProductListing from "../components/product/ProductListing";
import { launchProducts } from "../data/products";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q")?.trim() ?? "";

  const filtered = query
    ? launchProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <ProductListing
      title={query ? `Search Results for "${query}"` : "Search"}
      description={query ? `${filtered.length} products found` : "Try searching for a product, category or fabric"}
      breadcrumbLabel="Search"
      products={filtered}
    />
  );
}
