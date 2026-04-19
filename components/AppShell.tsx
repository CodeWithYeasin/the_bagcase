"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/cart-context";
import { SessionProvider } from "next-auth/react";
import PageTransition from "@/components/PageTransition";
import ChatWidget from "@/components/chat/ChatWidget";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <Cart />
        <ChatWidget />
        <WhatsAppButton />
      </CartProvider>
    </SessionProvider>
  );
}
