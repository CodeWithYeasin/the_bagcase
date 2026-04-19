"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { useSession, signIn } from "next-auth/react";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const shipping = subtotal > 0 ? 200 : 0;
  const total = subtotal + shipping;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      shippingAddress: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        city: formData.get("city"),
        country: formData.get("country"),
      },
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.unitPrice,
        quantity: item.quantity,
        image: item.image,
      })),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setMessage(data.error ?? "Unable to place order.");
      setLoading(false);
      return;
    }

    const data = await res.json();
    clearCart();
    router.push(`/order-confirmation?orderId=${data.item?._id}`);
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto mt-24 w-full max-w-3xl px-4 py-12 text-center" data-theme="light">
        <h1 className="font-serif text-4xl text-navy">Your cart is empty</h1>
        <p className="mt-3 text-sm text-navy/70">Add some essentials before checking out.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-full border border-gold bg-navy px-8 py-3 font-semibold text-cream hover:bg-gold hover:text-navy"
        >
          Browse Shop
        </Link>
      </section>
    );
  }

  if (status === "loading") {
    return (
      <section className="mx-auto mt-24 w-full max-w-3xl px-4 py-12 text-center" data-theme="light">
        <p className="text-sm text-navy/70">Loading checkout...</p>
      </section>
    );
  }

  if (!session?.user) {
    return (
      <section className="mx-auto mt-24 w-full max-w-3xl px-4 py-12 text-center" data-theme="light">
        <h1 className="font-serif text-3xl text-navy">Sign in to checkout</h1>
        <p className="mt-3 text-sm text-navy/70">Please sign in to complete your order.</p>
        <button
          onClick={() => signIn()}
          className="mt-6 inline-flex rounded-full border border-gold bg-navy px-8 py-3 font-semibold text-cream hover:bg-gold hover:text-navy"
        >
          Sign In
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-4 py-12 md:px-8" data-theme="light">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-gold/20 bg-white p-6">
          <h1 className="font-serif text-3xl text-navy">Checkout</h1>
          <div className="grid gap-3 md:grid-cols-2">
            <input name="name" placeholder="Full name" required className="rounded-xl border border-gold/30 px-3 py-2" />
            <input name="email" type="email" placeholder="Email" required className="rounded-xl border border-gold/30 px-3 py-2" />
            <input name="phone" placeholder="Phone" required className="rounded-xl border border-gold/30 px-3 py-2" />
            <input name="city" placeholder="City" required className="rounded-xl border border-gold/30 px-3 py-2" />
          </div>
          <input name="address" placeholder="Street address" required className="w-full rounded-xl border border-gold/30 px-3 py-2" />
          <input name="country" placeholder="Country" required className="w-full rounded-xl border border-gold/30 px-3 py-2" />

          {message && <p className="text-sm text-red-600">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full border border-gold bg-navy py-3 font-semibold text-cream transition hover:bg-gold hover:text-navy disabled:opacity-60"
          >
            {loading ? "Placing order..." : "Place order"}
          </button>
        </form>

        <div className="rounded-3xl border border-gold/20 bg-white p-6">
          <h2 className="font-serif text-2xl text-navy">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm text-navy/80">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-sm text-navy">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
