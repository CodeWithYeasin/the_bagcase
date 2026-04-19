"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/products";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  subtotal: number;
  shipping: number;
  total: number;
  items: OrderItem[];
};

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;
    const loadOrder = async () => {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) return;
      const data = await res.json();
      setOrder(data.item);
    };
    loadOrder();
  }, [orderId]);

  return (
    <section className="mx-auto mt-24 w-full max-w-3xl px-4 py-12 text-center" data-theme="light">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Thank you</p>
      <h1 className="mt-2 font-serif text-4xl text-navy">Order Confirmed</h1>
      {order ? (
        <div className="mt-6 rounded-2xl border border-gold/20 bg-white p-6 text-left">
          <p className="text-sm text-navy/70">Order ID: {order._id}</p>
          <div className="mt-4 space-y-2 text-sm">
            {order.items.map((item) => (
              <div key={item.name} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1 text-sm text-navy">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-navy/70">Loading order details...</p>
      )}
      <Link
        href="/shop"
        className="mt-6 inline-flex rounded-full border border-gold bg-navy px-6 py-3 font-semibold text-cream transition hover:bg-gold hover:text-navy"
      >
        Continue shopping
      </Link>
    </section>
  );
}
