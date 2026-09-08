import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../../types";
import Modal from "../ui/Modal";
import PriceTag from "../ui/PriceTag";
import Rating from "../ui/Rating";
import ColorSwatch from "../ui/ColorSwatch";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Heart } from "lucide-react";

export default function QuickViewModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [addedToBag, setAddedToBag] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    setSize(null);
    setColor(null);
    setAddedToBag(false);
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (addedToBag) {
      onClose();
      navigate("/bag");
      return;
    }
    if (!size || !color) return;
    addItem(product, size, color, 1);
    setAddedToBag(true);
  };

  return (
    <Modal open={!!product} onClose={onClose} maxWidthClass="max-w-3xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden rounded-xl bg-ivory-dark">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-soft">{product.category}</p>
            <h2 className="mt-1 font-serif text-2xl text-ink">{product.name}</h2>
            <Rating value={product.rating} count={product.reviewCount} className="mt-2" />
          </div>
          <PriceTag price={product.price} discountPrice={product.discountPrice} size="lg" />
          <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink">Colour</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <ColorSwatch key={c.name} color={c} selected={color === c.name} onClick={() => setColor(c.name)} />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                    size === s ? "border-ink bg-ink text-ivory" : "border-line text-ink-soft hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <Button variant="primary" size="md" fullWidth disabled={!product.inStock} onClick={handleAdd}>
              {!product.inStock ? "Out of Stock" : addedToBag ? "View Cart" : "Add to Bag"}
            </Button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line"
            >
              <Heart size={18} className={isWishlisted(product.id) ? "fill-burgundy text-burgundy" : "text-ink"} />
            </button>
          </div>
          <Link to={`/product/${product.slug}`} onClick={onClose} className="text-center text-xs font-medium text-ink underline underline-offset-4">
            View full details
          </Link>
        </div>
      </div>
    </Modal>
  );
}
