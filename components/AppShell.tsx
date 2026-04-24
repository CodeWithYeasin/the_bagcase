"use client";

import { CartProvider } from "@/lib/cart-context";
import { SessionProvider } from "next-auth/react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
