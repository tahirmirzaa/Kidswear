import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import type { Product } from "../../types";
import Badge from "../ui/Badge";
import PriceTag from "../ui/PriceTag";
import ColorSwatch from "../ui/ColorSwatch";
import { useWishlist } from "../../context/WishlistContext";
import { cn } from "../../lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-ivory-dark">
        <Link to={`/product/${product.slug}`} aria-label={product.name}>
          <img
            src={hovered && product.hoverImage ? product.hoverImage : product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="new">New</Badge>}
          {!product.inStock && <Badge variant="outofstock">Out of Stock</Badge>}
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-soft transition-transform hover:scale-105"
        >
          <Heart size={16} className={wishlisted ? "fill-burgundy text-burgundy" : "text-ink"} />
        </button>

        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className={cn(
              "absolute inset-x-3 bottom-3 hidden items-center justify-center gap-2 rounded-full bg-ink/90 py-2.5 text-xs font-medium text-ivory opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100",
              "sm:flex"
            )}
          >
            <Eye size={14} /> Quick View
          </button>
        )}
      </div>

      <Link to={`/product/${product.slug}`} className="mt-3 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-ink line-clamp-1">{product.name}</h3>
        <PriceTag price={product.price} discountPrice={product.discountPrice} size="sm" />
        <div className="mt-0.5 flex items-center gap-1">
          {product.colors.slice(0, 4).map((c) => (
            <ColorSwatch key={c.name} color={c} size="sm" />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-ink-soft">+{product.colors.length - 4}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
