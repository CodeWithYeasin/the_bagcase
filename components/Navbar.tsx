"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiShoppingCart, FiX } from "react-icons/fi";
import { useCart } from "@/lib/cart-context";
import { BRAND_LOGO_URL } from "@/lib/brand-assets";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-gold/20 bg-navy/95 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={BRAND_LOGO_URL}
            alt="The BagCase"
            width={218}
            height={118}
            className="h-12 w-auto rounded-md border border-gold/40 bg-cream/90 p-1"
          />
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-cream lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="transition hover:text-gold">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            className="relative rounded-full p-2 text-cream transition hover:bg-cream/10 hover:text-gold"
            onClick={openCart}
            data-cart-icon
            aria-label="Open cart"
          >
            <FiShoppingCart size={21} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-content-center rounded-full bg-gold text-xs font-medium text-navy">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="rounded-full p-2 text-cream hover:bg-cream/10 lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-72 border-l border-gold/20 bg-navy/98 p-6 lg:hidden"
          >
            <ul className="mt-16 space-y-6 text-lg text-cream">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
