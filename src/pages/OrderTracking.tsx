import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, PackageSearch } from "lucide-react";
import { useOrders, ORDER_STATUS_SEQUENCE } from "../context/OrdersContext";
import { getProductById } from "../data/products";
import Breadcrumb from "../components/ui/Breadcrumb";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { formatINR, cn } from "../lib/utils";

export default function OrderTracking() {
  const { orders, getOrder } = useOrders();
  const [params] = useSearchParams();
  const [searchId, setSearchId] = useState(params.get("id") ?? "");
  const [searched, setSearched] = useState(!!params.get("id"));

  const order = searched ? getOrder(searchId.trim()) : undefined;

  return (
    <div className="container-page py-8">
      <Breadcrumb items={[{ label: "Track Order" }]} />
      <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Track Your Order</h1>

      <div className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
        <Input
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="e.g. TA12345678"
          wrapperClassName="flex-1"
        />
        <Button variant="primary" onClick={() => setSearched(true)} className="h-fit sm:self-start">
          Track
        </Button>
      </div>

      {searched && !order && (
        <p className="mt-4 text-sm text-sale">No order found with that ID. Please check and try again.</p>
      )}

      {order && (
        <div className="mt-8 max-w-2xl rounded-2xl border border-line p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm text-ink-soft">Order ID</p>
              <p className="font-semibold text-ink">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-ink-soft">Estimated Delivery</p>
              <p className="font-semibold text-ink">{order.eta}</p>
            </div>
          </div>

          <div className="mt-8 flex items-start">
            {ORDER_STATUS_SEQUENCE.map((status, i) => {
              const currentIndex = ORDER_STATUS_SEQUENCE.indexOf(order.status);
              const done = i <= currentIndex;
              const isFirst = i === 0;
              const isLast = i === ORDER_STATUS_SEQUENCE.length - 1;
              return (
                <div key={status} className="flex flex-1 flex-col items-center gap-2 text-center">
                  <div className="flex w-full items-center">
                    <div className={cn("h-0.5 flex-1", isFirst ? "bg-transparent" : done ? "bg-burgundy" : "bg-line")} />
                    <div
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs",
                        done ? "bg-burgundy text-ivory" : "bg-ivory-dark text-ink-soft"
                      )}
                    >
                      {done ? <Check size={14} /> : i + 1}
                    </div>
                    <div className={cn("h-0.5 flex-1", isLast ? "bg-transparent" : i < currentIndex ? "bg-burgundy" : "bg-line")} />
                  </div>
                  <span className={cn("px-1 text-[11px] leading-tight", done ? "font-medium text-ink" : "text-ink-soft")}>{status}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col divide-y divide-line border-t border-line pt-4">
            {order.items.map((item, i) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <div key={i} className="flex items-center gap-3 pt-3 first:pt-0">
                  <img src={product.images[0]} alt={product.name} className="h-14 w-12 rounded object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-ink">{product.name}</p>
                    <p className="text-xs text-ink-soft">Size {item.size} · Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-ink">{formatINR(item.price * item.quantity)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!searched && orders.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">Your Recent Orders</h2>
          <div className="flex flex-col gap-3">
            {orders.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setSearchId(o.id);
                  setSearched(true);
                }}
                className="flex items-center justify-between rounded-xl border border-line p-4 text-left hover:border-ink"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{o.id}</p>
                  <p className="text-xs text-ink-soft">{new Date(o.date).toLocaleDateString("en-IN")} · {o.items.length} items</p>
                </div>
                <span className="text-xs font-semibold text-burgundy">{o.status}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {!searched && orders.length === 0 && (
        <EmptyState
          icon={<PackageSearch size={30} />}
          title="No orders yet"
          description="Once you place an order, you'll be able to track it here."
          ctaLabel="Start Shopping"
          ctaTo="/new-arrivals"
        />
      )}
    </div>
  );
}
