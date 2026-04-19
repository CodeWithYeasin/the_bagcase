import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "The BagCase | Exquisite Travel & Lifestyle",
  description: "Luxury travel and lifestyle e-commerce experience by The BagCase.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-cream font-sans text-navy antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
