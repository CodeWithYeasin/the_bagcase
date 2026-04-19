import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

const logoImage = "https://github.com/user-attachments/assets/3a86695a-5ebf-468c-babf-21f4673973de";
const coverImage = "https://github.com/user-attachments/assets/c65816c3-4553-4008-b168-73f33a235c03";

export const metadata: Metadata = {
  title: "The BagCase | Exquisite Travel & Lifestyle",
  description: "Luxury travel and lifestyle e-commerce experience by The BagCase.",
  icons: {
    icon: logoImage,
  },
  openGraph: {
    title: "The BagCase | Exquisite Travel & Lifestyle",
    description: "Luxury travel and lifestyle e-commerce experience by The BagCase.",
    images: [coverImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "The BagCase | Exquisite Travel & Lifestyle",
    description: "Luxury travel and lifestyle e-commerce experience by The BagCase.",
    images: [coverImage],
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
