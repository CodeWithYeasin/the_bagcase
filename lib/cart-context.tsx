"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

export type CartItem = Product & { quantity: number };

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsOpen(true);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalItems,
        subtotal,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
