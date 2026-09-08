import { useParams, Link } from "react-router-dom";
import ProductListing from "../components/product/ProductListing";
import CollectionUnavailable from "../components/product/CollectionUnavailable";
import { launchProducts } from "../data/products";
import { launchSizes } from "../data/taxonomy";

export default function AgePage() {
  const { slug } = useParams();
  const size = launchSizes.find((s) => s.slug === slug);
  if (!size) return <CollectionUnavailable />;

  const filtered = launchProducts.filter((p) => p.sizes.includes(size.label));

  return (
    <ProductListing
      title={`Size ${size.label}`}
      description={`Everyday Sets and Nightwear in size ${size.label}.`}
      breadcrumbLabel={size.label}
      products={filtered}
    />
  );
}

export function ShopByAgeIndex() {
  return (
    <div className="container-page py-14">
      <h1 className="font-serif text-3xl text-ink sm:text-4xl">Shop by Size</h1>
      <p className="mt-2 max-w-md text-sm text-ink-soft">Our launch range covers ages 2-6. Find their perfect fit.</p>
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {launchSizes.map((size) => (
          <Link key={size.slug} to={`/shop-by-age/${size.slug}`} className="flex flex-col items-center gap-3 rounded-2xl border border-line p-6 text-center hover:border-ink">
            <p className="text-lg font-semibold text-ink">{size.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
