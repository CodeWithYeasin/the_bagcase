"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiShoppingCart, FiX } from "react-icons/fi";
import { useCart } from "@/lib/cart-context";
import { BRAND_LOGO_URL } from "@/lib/brand-assets";
import { signIn, signOut, useSession } from "next-auth/react";

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
  const [onLightSection, setOnLightSection] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const { openCart, totalItems } = useCart();
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOnLightSection(entry.target.dataset.theme === "light");
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (totalItems === 0) return;
    setCartBump(true);
    const timeout = setTimeout(() => setCartBump(false), 420);
    return () => clearTimeout(timeout);
  }, [totalItems]);

  const textTone = onLightSection && !scrolled ? "text-navy" : "text-cream";

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-gold/20 bg-navy/70 shadow-[0_12px_40px_rgba(15,23,42,0.35)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative inline-flex items-center">
            <span className="absolute inset-0 rounded-md bg-[linear-gradient(120deg,rgba(201,168,76,0.2),rgba(248,233,187,0.6),rgba(201,168,76,0.2))] opacity-0 blur-md transition group-hover:opacity-100" />
            <Image
              src={BRAND_LOGO_URL}
              alt="The BagCase"
              width={218}
              height={118}
              className="relative z-10 h-12 w-auto rounded-md border border-gold/40 bg-cream/90 p-1 shadow-[0_0_18px_rgba(201,168,76,0.2)]"
            />
          </span>
          <span className={`hidden text-xs font-semibold tracking-[0.3em] md:inline ${textTone}`}>
            THE BAGCASE
          </span>
        </Link>

        <ul className={`hidden items-center gap-8 text-sm lg:flex ${textTone}`}>
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative pb-1 text-sm font-medium transition hover:text-gold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {session?.user && (
            <li>
              <Link
                href="/account"
                className="relative pb-1 text-sm font-medium transition hover:text-gold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition after:duration-300 hover:after:scale-x-100"
              >
                Account
              </Link>
            </li>
          )}
          {session?.user?.role === "admin" && (
            <li>
              <Link
                href="/admin"
                className="relative pb-1 text-sm font-medium transition hover:text-gold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition after:duration-300 hover:after:scale-x-100"
              >
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-2">
          <motion.button
            className={`relative rounded-full p-2 transition hover:bg-cream/10 hover:text-gold ${textTone}`}
            onClick={openCart}
            data-cart-icon
            aria-label="Open cart"
            animate={cartBump ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <FiShoppingCart size={21} />
            {totalItems > 0 && (
              <motion.span
                className="absolute -right-1 -top-1 grid h-5 w-5 place-content-center rounded-full bg-gold text-xs font-medium text-navy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 280 }}
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
          <button
            className={`rounded-full p-2 hover:bg-cream/10 lg:hidden ${textTone}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
          {session?.user ? (
            <button
              onClick={() => signOut()}
              className={`hidden rounded-full border border-gold/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-gold hover:text-navy lg:inline-flex ${textTone}`}
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className={`hidden rounded-full border border-gold/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-gold hover:text-navy lg:inline-flex ${textTone}`}
            >
              Sign In
            </button>
          )}
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
              {session?.user && (
                <li>
                  <Link href="/account" onClick={() => setMenuOpen(false)} className="hover:text-gold">
                    Account
                  </Link>
                </li>
              )}
              {session?.user?.role === "admin" && (
                <li>
                  <Link href="/admin" onClick={() => setMenuOpen(false)} className="hover:text-gold">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
            <div className="mt-8">
              {session?.user ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="w-full rounded-full border border-gold/50 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-gold hover:text-navy"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signIn();
                  }}
                  className="w-full rounded-full border border-gold/50 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-gold hover:text-navy"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
