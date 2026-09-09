import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Sparkles, Truck, RotateCcw } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "../data/products";
import Breadcrumb from "../components/ui/Breadcrumb";
import ProductGallery from "../components/product/ProductGallery";
import PriceTag from "../components/ui/PriceTag";
import ColorSwatch from "../components/ui/ColorSwatch";
import Accordion, { AccordionItem } from "../components/ui/Accordion";
import PincodeCheck from "../components/product/PincodeCheck";
import SizeGuideModal from "../components/product/SizeGuideModal";
import ProductCarousel from "../components/product/ProductCarousel";
import QuickViewModal from "../components/product/QuickViewModal";
import NotifyMe from "../components/product/NotifyMe";
import SectionHeading from "../components/ui/SectionHeading";
import { useWishlist } from "../context/WishlistContext";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { launchCollections } from "../data/taxonomy";
import type { Product } from "../types";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug ?? "");

  if (!product) return <NotFound />;

  return <ProductDetailContent key={product.id} product={product} />;
}

function ProductDetailContent({ product }: { product: Product }) {
  // Sibling colourways all share the same `colors` list (so navigating between
  // them shows the same swatches), so the *default* selected colour must be
  // looked up by matching this product's own slug, not just colors[0].
  const ownColor = product.colors.find((c) => c.slug === product.slug) ?? product.colors[0];
  const [color, setColor] = useState(ownColor?.name ?? "");
  const [size, setSize] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const recentlyViewed = useRecentlyViewed(product.id).filter((p) => p.id !== product.id);
  const related = useMemo(() => getRelatedProducts(product), [product]);
  const collection = launchCollections.find((c) => c.slug === product.launchCollection);
  const collectionLabel = collection?.label ?? product.category;
  const collectionTo = collection ? `/category/${collection.slug}` : "/new-arrivals";
  const sizeRange = product.sizes.length > 1 ? product.sizes.join(", ") : product.sizes[0];

  useDocumentMeta({
    title: `${product.name} | Pip & Panda`,
    description: `${product.description} Available in ${product.sizes.length > 1 ? "sizes" : "size"} ${sizeRange}, ages 2-6.`,
  });

  const selectSize = (s: string) => setSize(s);

  const selectColor = (c: (typeof product.colors)[number]) => {
    if (c.slug && c.slug !== product.slug) {
      navigate(`/product/${c.slug}`);
      return;
    }
    setColor(c.name);
  };

  return (
    <div className="container-page py-6">
      <Breadcrumb items={[{ label: collectionLabel, to: collectionTo }, { label: product.name }]} />

      <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:gap-14">
        <ProductGallery
          images={product.images}
          name={product.name}
          isWishlisted={isWishlisted(product.id)}
          onToggleWishlist={() => toggleWishlist(product)}
        />

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-burgundy">{product.category}</p>
            <h1 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">{product.name}</h1>
          </div>

          <PriceTag price={product.price} discountPrice={product.discountPrice} size="lg" />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink">
              Colour: <span className="font-normal text-ink-soft">{color}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <ColorSwatch key={c.name} color={c} selected={color === c.name} onClick={() => selectColor(c)} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink">
                Size {size && <span className="font-normal text-ink-soft">· {size}</span>}
              </p>
              <button onClick={() => setSizeGuideOpen(true)} className="text-xs font-medium text-burgundy underline underline-offset-2">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => selectSize(s)}
                  className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
                    size === s ? "border-ink bg-ink text-ivory" : "border-line text-ink-soft hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-soft">Available in {product.sizes.length > 1 ? "sizes" : "size"} {sizeRange}</p>
          </div>

          <NotifyMe product={product} size={size} color={color} disabled={!product.inStock} />

          <div className="rounded-xl border border-line p-4">
            <PincodeCheck />
          </div>

          <div className="grid grid-cols-1 gap-3 rounded-xl bg-sage/30 p-4 sm:grid-cols-2">
            {product.benefits.map((b) => (
              <div key={b} className="flex items-center gap-2 text-xs text-ink-soft">
                <Sparkles size={14} className="shrink-0 text-burgundy" /> {b}
              </div>
            ))}
          </div>

          <Accordion>
            <AccordionItem title="Product Description" defaultOpen>
              <p>{product.description}</p>
            </AccordionItem>
            <AccordionItem title="Fabric & Care">
              <p className="mb-2 font-medium text-ink">Fabric: {product.fabric}</p>
              <ul className="list-inside list-disc space-y-1">
                {product.careInstructions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem title="Fit Information">
              <p>{product.fit}</p>
            </AccordionItem>
            <AccordionItem title="Delivery & Returns">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2">
                  <Truck size={15} className="text-burgundy" /> Free delivery on prepaid orders of ₹1,499 or more
                </span>
                <span className="flex items-center gap-2">
                  <RotateCcw size={15} className="text-burgundy" /> 7-day returns & exchanges after delivery
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-burgundy" /> Quality checked before dispatch
                </span>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-line pt-12">
          <SectionHeading eyebrow="You May Also Like" title="Related Products" />
          <ProductCarousel products={related} onQuickView={setQuickViewProduct} />
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="mt-16 border-t border-line pt-12">
          <SectionHeading eyebrow="Your Browsing" title="Recently Viewed" />
          <ProductCarousel products={recentlyViewed} onQuickView={setQuickViewProduct} />
        </section>
      )}

      <div className="mt-10 flex justify-center">
        <Link to={collectionTo} className="text-sm font-medium text-ink underline underline-offset-4">
          Back to {collectionLabel}
        </Link>
      </div>

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
