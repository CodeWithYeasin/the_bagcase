import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { BRAND_COVER_URL, BRAND_LOGO_URL } from "@/lib/brand-assets";

export const metadata: Metadata = {
  title: "The BagCase | Exquisite Travel & Lifestyle",
  description: "Luxury travel and lifestyle e-commerce experience by The BagCase.",
  icons: {
    icon: BRAND_LOGO_URL,
  },
  openGraph: {
    title: "The BagCase | Exquisite Travel & Lifestyle",
    description: "Luxury travel and lifestyle e-commerce experience by The BagCase.",
    images: [BRAND_COVER_URL],
  },
  twitter: {
    card: "summary_large_image",
    title: "The BagCase | Exquisite Travel & Lifestyle",
    description: "Luxury travel and lifestyle e-commerce experience by The BagCase.",
    images: [BRAND_COVER_URL],
  },
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
