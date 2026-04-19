"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { formatPrice } from "@/lib/products";

type Order = {
  _id: string;
  total: number;
  status: string;
};

export default function AccountPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      const res = await fetch("/api/orders");
      if (!res.ok) return;
      const data = await res.json();
      setOrders(data.items ?? []);
    };
    loadOrders();
  }, []);

  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-4 py-12 md:px-8" data-theme="light">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">My Account</p>
        <h1 className="mt-2 font-serif text-4xl text-navy">Welcome {session?.user?.name ?? "Guest"}</h1>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gold/20 bg-white p-6">
          <h2 className="font-serif text-2xl text-navy">Profile</h2>
          <p className="mt-3 text-sm text-navy/70">Email: {session?.user?.email ?? "Not signed in"}</p>
          <p className="mt-2 text-sm text-navy/70">Role: {session?.user?.role ?? "visitor"}</p>
        </div>

        <div className="rounded-2xl border border-gold/20 bg-white p-6">
          <h2 className="font-serif text-2xl text-navy">Recent Orders</h2>
          <div className="mt-3 space-y-2 text-sm text-navy/70">
            {orders.length ? (
              orders.map((order) => (
                <div key={order._id} className="flex justify-between">
                  <span>#{order._id.slice(-6)}</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              ))
            ) : (
              <p>No orders yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gold/20 bg-white p-6">
          <h2 className="font-serif text-2xl text-navy">Wishlist</h2>
          <p className="mt-3 text-sm text-navy/70">Save favorite items to revisit later.</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gold/20 bg-white p-6">
        <h2 className="font-serif text-2xl text-navy">Chat History</h2>
        <p className="mt-3 text-sm text-navy/70">
          Your live chat messages will appear here once you start a conversation.
        </p>
      </div>
    </section>
  );
}
