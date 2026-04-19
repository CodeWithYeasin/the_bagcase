"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import ProductViewer3D from "@/components/ProductViewer3D";
import { formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

const tabs = ["Details", "Materials", "Shipping"] as const;

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = useMemo(() => products.find((item) => item.id === Number(params.id)), [params.id]);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Details");
  const [selectedColor, setSelectedColor] = useState("Navy Blue");
  const [selectedSize, setSelectedSize] = useState("Standard");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return notFound();

  return (
    <section className="mx-auto mt-24 grid w-full max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-2">
      <div className="space-y-5">
        <ProductViewer3D />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((slot) => (
            <button key={slot} className="relative h-28 overflow-hidden rounded-xl border border-gold/20">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm tracking-[0.2em] text-gold">THE BAGCASE</p>
        <h1 className="mt-3 font-serif text-4xl text-navy">{product.name}</h1>
        <p className="mt-3 text-2xl font-semibold text-gold">{formatPrice(product.price)}</p>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gold/25 px-3 py-2"
            >
              {[product.color, "Brown", "Black"].map((color) => (
                <option key={color}>{color}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gold/25 px-3 py-2"
            >
              {["Standard", "Large", "Compact"].map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Quantity</label>
            <div className="mt-2 flex w-32 items-center justify-between rounded-full border border-gold/25 px-3 py-2">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            className="rounded-full border border-gold bg-navy px-7 py-3 font-medium text-cream transition hover:bg-gold hover:text-navy"
            onClick={() => addToCart(product, quantity)}
          >
            Add to Cart
          </button>
          <button className="rounded-full border border-navy px-7 py-3 font-medium text-navy">Wishlist</button>
        </div>

        <div className="mt-9 rounded-xl border border-gold/25 bg-white p-5">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`rounded-full px-4 py-2 text-sm ${
                  activeTab === tab ? "bg-navy text-cream" : "bg-cream"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-navy/80">
            {activeTab === "Details" && product.description}
            {activeTab === "Materials" && `Material: ${product.material}. Premium handcrafted finish for daily durability.`}
            {activeTab === "Shipping" && "Inside Bangladesh: 2-4 days. International delivery available upon request."}
          </p>
        </div>
      </div>
    </section>
  );
}
