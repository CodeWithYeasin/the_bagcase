"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const categories = ["All", "Briefcase", "Duffel Bag", "Accessories", "Wallet"] as const;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [priceRange, setPriceRange] = useState(9000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (selectedCategory === "All" || p.category === selectedCategory) && p.price <= priceRange
      ),
    [selectedCategory, priceRange]
  );

  return (
    <section className="mx-auto mt-20 grid w-full max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-2xl border border-gold/25 bg-white p-5 lg:h-fit">
        <button
          className="mb-4 w-full rounded-full border border-gold/40 py-2 text-sm font-medium lg:hidden"
          onClick={() => setFiltersOpen((prev) => !prev)}
        >
          {filtersOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className={`space-y-6 ${filtersOpen ? "block" : "hidden lg:block"}`}>
          <div>
            <h3 className="font-serif text-xl">Category</h3>
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                    selectedCategory === category ? "bg-navy text-cream" : "bg-cream"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl">Price Range</h3>
            <input
              type="range"
              min={500}
              max={9000}
              step={100}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="mt-3 w-full accent-gold"
            />
            <p className="mt-2 text-sm text-navy/70">Up to ৳{priceRange.toLocaleString("en-BD")}</p>
          </div>

          <div>
            <h3 className="font-serif text-xl">Brand</h3>
            <p className="mt-2 rounded-lg bg-cream px-3 py-2 text-sm">The BagCase</p>
          </div>
        </div>
      </aside>

      <div>
        <h1 className="font-serif text-4xl">Shop</h1>
        <p className="mt-2 text-sm text-navy/70">Luxury essentials for travel and lifestyle.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
