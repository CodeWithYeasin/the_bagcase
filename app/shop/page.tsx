"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, productCategories } from "@/lib/products";

const categories = ["All", ...productCategories] as const;
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
] as const;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [priceRange, setPriceRange] = useState(9000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>("featured");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesPrice = p.price <= priceRange;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase().trim());
      const matchesStock = !onlyInStock || p.stock > 0;
      const matchesNew = !onlyNew || p.isNew;
      return matchesCategory && matchesPrice && matchesQuery && matchesStock && matchesNew;
    });

    return result.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "newest") return Number(b.isNew) - Number(a.isNew);
      return b.rating - a.rating;
    });
  }, [selectedCategory, priceRange, query, onlyInStock, onlyNew, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section
      className="mx-auto mt-20 grid w-full max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[260px_1fr]"
      data-theme="light"
    >
      <aside className="rounded-2xl border border-gold/25 bg-white p-5 lg:h-fit">
        <button
          className="mb-4 w-full rounded-full border border-gold/40 py-2 text-sm font-medium lg:hidden"
          onClick={() => setFiltersOpen((prev) => !prev)}
        >
          {filtersOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className={`space-y-6 ${filtersOpen ? "block" : "hidden lg:block"}`}>
          <div>
            <h3 className="font-serif text-xl">Search</h3>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search products"
              className="mt-3 w-full rounded-lg border border-gold/30 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <h3 className="font-serif text-xl">Category</h3>
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setPage(1);
                  }}
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
              onChange={(e) => {
                setPriceRange(Number(e.target.value));
                setPage(1);
              }}
              className="mt-3 w-full accent-gold"
            />
            <p className="mt-2 text-sm text-navy/70">Up to ৳{priceRange.toLocaleString("en-BD")}</p>
          </div>

          <div>
            <h3 className="font-serif text-xl">Availability</h3>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => {
                  setOnlyInStock(e.target.checked);
                  setPage(1);
                }}
                className="h-4 w-4 accent-gold"
              />
              In stock only
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={onlyNew}
                onChange={(e) => {
                  setOnlyNew(e.target.checked);
                  setPage(1);
                }}
                className="h-4 w-4 accent-gold"
              />
              New arrivals
            </label>
          </div>

          <div>
            <h3 className="font-serif text-xl">Brand</h3>
            <p className="mt-2 rounded-lg bg-cream px-3 py-2 text-sm">The BagCase</p>
          </div>
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-4xl">Shop</h1>
            <p className="mt-2 text-sm text-navy/70">Luxury essentials for travel and lifestyle.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-navy/60">Sort</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as (typeof sortOptions)[number]["value"]);
                setPage(1);
              }}
              className="rounded-full border border-gold/30 bg-white px-4 py-2 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paged.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-6 text-sm text-navy/70">No products match your filters.</p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-navy/70">
            Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}-
            {Math.min(page * pageSize, filtered.length)} of {filtered.length} items
          </p>
          <div className="flex items-center gap-2">
            <button
              className="rounded-full border border-gold/30 px-4 py-2 text-sm disabled:opacity-40"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="text-sm text-navy/70">
              {page} / {totalPages}
            </span>
            <button
              className="rounded-full border border-gold/30 px-4 py-2 text-sm disabled:opacity-40"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
