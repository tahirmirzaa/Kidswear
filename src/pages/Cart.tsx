import { Link } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/ui/Breadcrumb";
import EmptyState from "../components/ui/EmptyState";
import QuantitySelector from "../components/ui/QuantitySelector";
import ColorSwatch from "../components/ui/ColorSwatch";
import Button from "../components/ui/Button";
import { formatINR } from "../lib/utils";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Cart() {
  useDocumentMeta({ title: "Shopping Bag | Pip & Panda", noindex: true });
  const { lines, removeItem, updateQuantity, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container-page py-8">
        <Breadcrumb items={[{ label: "Shopping Bag" }]} />
        <EmptyState
          icon={<ShoppingBag size={30} />}
          title="Your bag is empty"
          description="Looks like you haven't added anything yet. Let's fix that."
          ctaLabel="Start Shopping"
          ctaTo="/new-arrivals"
        />
      </div>
    );
  }

  const shipping = subtotal >= 1499 ? 0 : 79;
  const total = subtotal + shipping;

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: "Shopping Bag" }]} />
      <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Shopping Bag</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col divide-y divide-line">
          {lines.map((line) => {
            const colorObj = line.product.colors.find((c) => c.name === line.color) ?? line.product.colors[0];
            const price = line.product.discountPrice ?? line.product.price;
            return (
              <div key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-4 py-5">
                <Link to={`/product/${line.product.slug}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-ivory-dark">
                  <img src={line.product.images[0]} alt={line.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link to={`/product/${line.product.slug}`} className="text-sm font-medium text-ink hover:text-burgundy">
                        {line.product.name}
                      </Link>
                      <div className="mt-1 flex items-center gap-2 text-xs text-ink-soft">
                        <span>Size: {line.size}</span>
                        <span className="flex items-center gap-1">
                          Colour: {colorObj && <ColorSwatch color={colorObj} size="sm" />}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(line.productId, line.size, line.color)}
                      aria-label="Remove item"
                      className="h-fit text-ink-soft hover:text-sale"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <QuantitySelector
                      value={line.quantity}
                      onChange={(q) => updateQuantity(line.productId, line.size, line.color, q)}
                    />
                    <span className="text-sm font-semibold text-ink">{formatINR(price * line.quantity)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-2xl border border-line p-6">
          <h2 className="font-serif text-xl text-ink">Order Summary</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-ink-soft">Add {formatINR(1499 - subtotal)} more for free shipping.</p>
            )}
            <div className="mt-2 flex justify-between border-t border-line pt-3 text-base font-semibold text-ink">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
          <Link to="/checkout">
            <Button variant="primary" fullWidth size="lg" className="mt-5">
              Proceed to Checkout
            </Button>
          </Link>
          <Link to="/new-arrivals" className="mt-3 block text-center text-xs font-medium text-ink underline underline-offset-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
