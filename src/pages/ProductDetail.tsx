import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Sparkles, Truck, RotateCcw } from "lucide-react";
import { getProductBySlug, getRelatedProducts, getCompleteTheLook } from "../data/products";
import Breadcrumb from "../components/ui/Breadcrumb";
import ProductGallery from "../components/product/ProductGallery";
import PriceTag from "../components/ui/PriceTag";
import ColorSwatch from "../components/ui/ColorSwatch";
import Button from "../components/ui/Button";
import Accordion, { AccordionItem } from "../components/ui/Accordion";
import PincodeCheck from "../components/product/PincodeCheck";
import SizeGuideModal from "../components/product/SizeGuideModal";
import ProductCarousel from "../components/product/ProductCarousel";
import QuickViewModal from "../components/product/QuickViewModal";
import SectionHeading from "../components/ui/SectionHeading";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useToast } from "../context/ToastContext";
import { launchCollections, launchSizes } from "../data/taxonomy";
import type { Product } from "../types";
import NotFound from "./NotFound";

const LAUNCH_SIZE_LABELS = launchSizes.map((s) => s.label);

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug ?? "");

  if (!product) return <NotFound />;

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState<string | null>(null);
  const [addedToBag, setAddedToBag] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const recentlyViewed = useRecentlyViewed(product.id).filter((p) => p.id !== product.id);
  const related = useMemo(() => getRelatedProducts(product), [product]);
  const completeLook = useMemo(() => getCompleteTheLook(product), [product]);
  const collection = launchCollections.find((c) => c.slug === product.launchCollection);
  const collectionLabel = collection?.label ?? product.category;
  const collectionTo = collection ? `/category/${collection.slug}` : "/new-arrivals";
  const availableSizes = product.sizes.filter((s) => LAUNCH_SIZE_LABELS.includes(s));

  const handleAddToBag = () => {
    if (addedToBag) {
      navigate("/bag");
      return;
    }
    if (!size) {
      showToast("Please select a size");
      return;
    }
    addItem(product, size, color, 1);
    setAddedToBag(true);
  };

  const selectSize = (s: string) => {
    setSize(s);
    setAddedToBag(false);
  };

  const selectColor = (c: string) => {
    setColor(c);
    setAddedToBag(false);
  };

  const handleBuyNow = () => {
    if (!size) {
      showToast("Please select a size");
      return;
    }
    addItem(product, size, color, 1);
    window.location.href = "/checkout";
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
                <ColorSwatch key={c.name} color={c} selected={color === c.name} onClick={() => selectColor(c.name)} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink">
                Age / Size {size && <span className="font-normal text-ink-soft">· {size}</span>}
              </p>
              <button onClick={() => setSizeGuideOpen(true)} className="text-xs font-medium text-burgundy underline underline-offset-2">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((s) => (
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
            <p className="mt-2 text-xs text-ink-soft">Suitable for ages 2-6</p>
          </div>

          <Button variant="primary" size="lg" fullWidth disabled={!product.inStock} onClick={handleAddToBag}>
            {!product.inStock ? "Out of Stock" : addedToBag ? "View Cart" : "Add to Bag"}
          </Button>
          <Button variant="outline" size="lg" fullWidth disabled={!product.inStock} onClick={handleBuyNow}>
            Buy Now
          </Button>

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
                  <Truck size={15} className="text-burgundy" /> Free delivery on prepaid orders above ₹1,499
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

      {completeLook.length > 0 && (
        <section className="mt-16 border-t border-line pt-12">
          <SectionHeading eyebrow="Style It Together" title="Complete the Look" />
          <ProductCarousel products={completeLook} onQuickView={setQuickViewProduct} />
        </section>
      )}

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
