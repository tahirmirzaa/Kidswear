import { useParams } from "react-router-dom";
import ProductListing from "../components/product/ProductListing";
import CollectionUnavailable from "../components/product/CollectionUnavailable";
import { launchProducts } from "../data/products";
import { launchCollections } from "../data/taxonomy";

export default function CategoryPage() {
  const { slug } = useParams();
  const collection = launchCollections.find((c) => c.slug === slug);
  if (!collection) return <CollectionUnavailable />;

  const filtered = launchProducts.filter((p) => p.launchCollection === collection.slug);

  return (
    <ProductListing
      title={collection.label}
      description={collection.description}
      bannerImage={collection.image}
      breadcrumbLabel={collection.label}
      products={filtered}
    />
  );
}
