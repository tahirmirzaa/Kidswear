import { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import ProductGrid from "../components/product/ProductGrid";
import QuickViewModal from "../components/product/QuickViewModal";
import EmptyState from "../components/ui/EmptyState";
import Breadcrumb from "../components/ui/Breadcrumb";
import type { Product } from "../types";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Wishlist() {
  useDocumentMeta({ title: "Wishlist | Pip & Panda", noindex: true });
  const { products } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">My Wishlist</h1>
      <p className="mt-1 text-sm text-ink-soft">{products.length} items saved</p>

      <div className="mt-8">
        {products.length === 0 ? (
          <EmptyState
            icon={<Heart size={30} />}
            title="Your wishlist is empty"
            description="Save your favourite pieces here so you never lose track of them."
            ctaLabel="Continue Shopping"
            ctaTo="/new-arrivals"
          />
        ) : (
          <ProductGrid products={products} onQuickView={setQuickViewProduct} />
        )}
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
