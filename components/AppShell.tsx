"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/cart-context";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Cart />
      <WhatsAppButton />
    </CartProvider>
  );
}
