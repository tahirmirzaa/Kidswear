import { useParams } from "react-router-dom";
import ProductListing from "../components/product/ProductListing";
import CollectionUnavailable from "../components/product/CollectionUnavailable";
import { launchProducts } from "../data/products";
import { launchCollections } from "../data/taxonomy";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const META: Record<string, { title: string; description: string }> = {
  "everyday-sets": {
    title: "Everyday Sets for Kids Aged 2-6 | Pip & Panda",
    description: "Cotton everyday sets for children aged 2-6, built for play and everyday comfort. Part of Pip & Panda's launch range.",
  },
  nightwear: {
    title: "Kids' Nightwear for Ages 2-6 | Pip & Panda",
    description: "Breathable cotton nightwear for children aged 2-6, designed for sound sleep. Part of Pip & Panda's launch range.",
  },
};

export default function CategoryPage() {
  const { slug } = useParams();
  const collection = launchCollections.find((c) => c.slug === slug);
  useDocumentMeta(
    collection && META[collection.slug]
      ? META[collection.slug]
      : { title: "Collection Unavailable | Pip & Panda", noindex: true }
  );
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
