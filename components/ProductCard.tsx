"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice, Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

function runFlyToCartAnimation(element: HTMLElement) {
  const cart = document.querySelector("[data-cart-icon]") as HTMLElement | null;
  if (!cart) return;
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

  return (
    <motion.div whileHover={{ y: -6 }} className="group [perspective:1000px]">
      <div className="relative h-[420px] w-full rounded-2xl border border-gold/20 [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 rounded-2xl bg-white p-4 [backface-visibility:hidden]">
          {product.badge && (
            <span className="absolute left-4 top-4 z-10 rounded-r-full bg-gold px-3 py-1 text-xs font-medium text-navy">
              {product.badge}
            </span>
          )}
          <div className="relative h-[72%] overflow-hidden rounded-xl bg-cream">
            <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="font-serif text-xl text-navy">{product.name}</h3>
            <p className="text-sm text-navy/65">{product.category}</p>
            <p className="font-medium text-gold">{formatPrice(product.price)}</p>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-navy p-6 text-cream [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Quick Details</p>
            <h3 className="mt-2 font-serif text-2xl">{product.name}</h3>
            <p className="mt-4 text-sm text-cream/80">{product.description}</p>
            <p className="mt-3 text-sm">Material: {product.material}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={(e) => {
                addToCart(product, 1);
                runFlyToCartAnimation(e.currentTarget);
              }}
              className="w-full rounded-full border border-gold bg-navy py-3 font-medium text-cream transition hover:bg-gold hover:text-navy"
            >
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
