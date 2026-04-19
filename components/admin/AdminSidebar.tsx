"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Chat", href: "/admin/chat" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Users", href: "/admin/users" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col gap-4 border-r border-gold/20 bg-white/70 p-6 backdrop-blur-xl lg:w-64">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Admin</p>
        <h2 className="mt-2 font-serif text-2xl text-navy">Control Panel</h2>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                active ? "bg-navy text-cream" : "text-navy/70 hover:bg-cream"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="rounded-xl border border-gold/20 bg-cream p-4 text-xs text-navy/70">
        Manage inventory, support chats, and elevate the BagCase experience.
      </div>
    </aside>
  );
}
