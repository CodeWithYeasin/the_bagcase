"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice, getDiscountedPrice, Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useEffect, useMemo, useState } from "react";

function runFlyToCartAnimation(element: HTMLElement) {
  const cart = document.querySelector("[data-cart-icon]") as HTMLElement | null;
  if (!cart) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Cart icon not found. Skipping fly-to-cart animation.");
    }
    return;
  }

  const from = element.getBoundingClientRect();
  const to = cart.getBoundingClientRect();
  const clone = element.cloneNode(true) as HTMLElement;

  clone.style.position = "fixed";
  clone.style.left = `${from.left}px`;
  clone.style.top = `${from.top}px`;
  clone.style.width = `${from.width}px`;
  clone.style.height = `${from.height}px`;
  clone.style.zIndex = "100";
  clone.style.transition = "all .7s cubic-bezier(0.22, 1, 0.36, 1)";
  clone.style.pointerEvents = "none";

  document.body.appendChild(clone);
  requestAnimationFrame(() => {
    clone.style.left = `${to.left}px`;
    clone.style.top = `${to.top}px`;
    clone.style.width = "12px";
    clone.style.height = "12px";
    clone.style.opacity = "0.2";
  });

  setTimeout(() => clone.remove(), 720);
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [displayDiscount, setDisplayDiscount] = useState(0);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const discountedPrice = useMemo(
    () => getDiscountedPrice(product.price, product.discountPercent),
    [product.discountPercent, product.price]
  );

  useEffect(() => {
    if (!product.discountPercent) return;
    let start = 0;
    const duration = 600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.round(start + progress * product.discountPercent);
      setDisplayDiscount(value);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [product.discountPercent]);

  return (
    <motion.div whileHover={{ y: -6 }} className="group [perspective:1000px]">
      <div className="relative h-[440px] w-full rounded-2xl border border-gold/20 [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)] after:absolute after:inset-[1px] after:rounded-2xl after:border after:border-gold/50 after:opacity-0 after:transition after:duration-700 group-hover:after:opacity-100 group-hover:after:animate-border-trace">
        <div className="absolute inset-0 rounded-2xl bg-white p-4 [backface-visibility:hidden]">
          {(product.badge || product.isNewArrival) && (
            <span className="absolute left-4 top-4 z-10 rounded-r-full bg-gold px-3 py-1 text-xs font-medium text-navy animate-pulse-slow">
              {product.badge ?? "New Arrival"}
            </span>
          )}
          <div className="relative h-[72%] overflow-hidden rounded-xl bg-cream">
            <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="font-serif text-xl text-navy">{product.name}</h3>
            <p className="text-sm text-navy/65">{product.category}</p>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gold">{formatPrice(discountedPrice)}</p>
              {product.discountPercent > 0 && (
                <span className="text-xs text-navy/60 line-through">{formatPrice(product.price)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-navy p-6 text-cream [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Quick Details</p>
            <h3 className="mt-2 font-serif text-2xl">{product.name}</h3>
            <p className="mt-4 text-sm text-cream/80">{product.description}</p>
            <p className="mt-3 text-sm">Material: {product.material}</p>
            <p className="mt-2 text-sm">Stock: {product.stock > 0 ? `${product.stock} available` : "Out of stock"}</p>
            {product.discountPercent > 0 && (
              <p className="mt-2 text-sm text-gold">Save {displayDiscount}% today</p>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={(e) => {
                if (product.stock <= 0) return;
                addToCart(product, 1);
                runFlyToCartAnimation(e.currentTarget);
                const rect = e.currentTarget.getBoundingClientRect();
                setRipples((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  },
                ]);
              }}
              className="relative w-full overflow-hidden rounded-full border border-gold bg-navy py-3 font-medium text-cream transition hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-50"
              disabled={product.stock <= 0}
            >
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/60 opacity-0 animate-ripple"
                  style={{ left: ripple.x, top: ripple.y }}
                  onAnimationEnd={() =>
                    setRipples((prev) => prev.filter((item) => item.id !== ripple.id))
                  }
                />
              ))}
              Add to Cart
            </button>
            <Link href={`/shop/${product.id}`} className="block text-center text-sm text-gold hover:underline">
              View Product
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
