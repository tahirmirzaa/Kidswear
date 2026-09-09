import { useParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useOrders } from "../context/OrdersContext";
import { getProductById } from "../data/products";
import Button from "../components/ui/Button";
import { formatINR } from "../lib/utils";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import NotFound from "./NotFound";

export default function OrderConfirmation() {
  useDocumentMeta({ title: "Order Confirmed | Pip & Panda", noindex: true });
  const { orderId } = useParams();
  const { getOrder } = useOrders();
  const order = getOrder(orderId ?? "");

  if (!order) return <NotFound />;

  return (
    <div className="container-page flex justify-center py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/50 text-sage-dark">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="mt-5 font-serif text-3xl text-ink">Order Confirmed!</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Thank you for shopping with Pip & Panda. A confirmation has been sent for order <strong>{order.id}</strong>.
        </p>

        <div className="mt-8 rounded-2xl border border-line p-6 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-ink-soft">Order ID</span>
            <span className="font-medium text-ink">{order.id}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-ink-soft">Estimated Delivery</span>
            <span className="font-medium text-ink">{order.eta}</span>
          </div>
          <div className="mt-4 flex flex-col divide-y divide-line">
            {order.items.map((item, i) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <div key={i} className="flex justify-between gap-3 pt-3 first:pt-0 text-sm">
                  <span className="text-ink-soft">
                    {product.name} ({item.size}) × {item.quantity}
                  </span>
                  <span className="font-medium text-ink">{formatINR(item.price * item.quantity)}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-3 text-base font-semibold text-ink">
            <span>Total Paid</span>
            <span>{formatINR(order.total)}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to={`/orders/track?id=${order.id}`} className="sm:w-48">
            <Button variant="primary" size="md" fullWidth>
              Track Order
            </Button>
          </Link>
          <Link to="/new-arrivals" className="sm:w-48">
            <Button variant="outline" size="md" fullWidth>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
