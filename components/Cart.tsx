"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { formatPrice, getDiscountedPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function Cart() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            aria-label="Close cart overlay"
            className="fixed inset-0 z-[70] bg-black/45"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-[80] flex h-screen w-full max-w-md flex-col border-l border-gold/30 bg-cream"
          >
            <div className="flex items-center justify-between border-b border-gold/30 p-5">
              <h2 className="font-serif text-2xl text-navy">Your Cart</h2>
              <button onClick={closeCart} className="rounded-full p-2 text-navy hover:bg-navy/10" aria-label="Close">
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {items.length === 0 ? (
                <p className="text-sm text-navy/70">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="rounded-xl border border-gold/25 bg-white p-3">
                    <div className="flex gap-3">
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-cream">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-navy">{item.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-navy/70">
                          <span>{formatPrice(getDiscountedPrice(item.price, item.discountPercent))}</span>
                          {item.discountPercent > 0 && (
                            <span className="text-xs line-through">{formatPrice(item.price)}</span>
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-gold/30 px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                              <FiMinus size={14} />
                            </button>
                            <span className="min-w-6 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                              <FiPlus size={14} />
                            </button>
                          </div>
                          <button className="text-xs text-red-600" onClick={() => removeItem(item.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-4 border-t border-gold/30 p-5">
              <div className="flex justify-between text-navy">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              {items.length === 0 ? (
                <button
                  className="w-full rounded-full border border-gold/50 bg-navy/40 py-3 font-medium text-cream/60"
                  disabled
                >
                  Checkout
                </button>
              ) : (
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full rounded-full border border-gold bg-navy py-3 text-center font-medium text-cream transition hover:bg-gold hover:text-navy"
                >
                  Checkout
                </Link>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
