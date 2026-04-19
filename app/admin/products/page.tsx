"use client";

import { useEffect, useMemo, useState } from "react";
import ProductEditor from "@/components/admin/ProductEditor";
import { productCategories } from "@/lib/products";

type AdminProduct = {
  _id?: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  category: string;
  color: string;
  material: string;
  image: string;
  images: string[];
  description: string;
  discountPercent: number;
  stock: number;
  isNew: boolean;
  rating: number;
  tags: string[];
};

const emptyProduct: AdminProduct = {
  name: "",
  slug: "",
  sku: "",
  price: 0,
  category: productCategories[0],
  color: "",
  material: "",
  image: "",
  images: [],
  description: "",
  discountPercent: 0,
  stock: 0,
  isNew: false,
  rating: 4.5,
  tags: [],
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name");
  const [selected, setSelected] = useState<AdminProduct | null>(null);
  const [formState, setFormState] = useState<AdminProduct>(emptyProduct);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const filtered = useMemo(() => {
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase().trim())
    );
    return result.sort((a, b) => {
      if (sort === "price") return b.price - a.price;
      if (sort === "stock") return b.stock - a.stock;
      return a.name.localeCompare(b.name);
    });
  }, [products, query, sort]);

  const loadProducts = async () => {
    const res = await fetch("/api/products");
    if (!res.ok) return;
    const data = await res.json();
    setProducts(data.items ?? []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSelect = (product: AdminProduct) => {
    setSelected(product);
    setFormState(product);
    setMessage("");
  };

  const handleUpload = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !preset) {
      setMessage("Cloudinary is not configured.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      setFormState((prev) => ({
        ...prev,
        image: prev.image || data.secure_url,
        images: [...prev.images, data.secure_url],
      }));
    } else {
      setMessage("Upload failed. Check Cloudinary configuration.");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    const payload = {
      ...formState,
      slug: formState.slug || formState.name.toLowerCase().replace(/\s+/g, "-"),
    };
    const res = await fetch(`/api/products${selected?._id ? `/${selected._id}` : ""}`, {
      method: selected?._id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json();
      setMessage(data.error ?? "Unable to save product.");
      setSaving(false);
      return;
    }
    await loadProducts();
    setSelected(null);
    setFormState(emptyProduct);
    setMessage("Product saved successfully.");
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!selected?._id) return;
    const res = await fetch(`/api/products/${selected._id}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage("Unable to delete product.");
      return;
    }
    await loadProducts();
    setSelected(null);
    setFormState(emptyProduct);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Inventory</p>
          <h1 className="mt-2 font-serif text-3xl text-navy">Product Management</h1>
        </div>
        <button
          onClick={() => {
            setSelected(null);
            setFormState(emptyProduct);
          }}
          className="rounded-full border border-gold/30 px-5 py-2 text-sm font-semibold text-navy"
        >
          New Product
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="flex-1 rounded-xl border border-gold/30 px-4 py-3 text-sm"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-gold/30 px-4 py-3 text-sm"
            >
              <option value="name">Sort: Name</option>
              <option value="price">Sort: Price</option>
              <option value="stock">Sort: Stock</option>
            </select>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-white shadow-sm">
            <div className="grid grid-cols-4 gap-3 border-b border-gold/20 px-4 py-3 text-xs uppercase tracking-[0.2em] text-navy/60">
              <span>Name</span>
              <span>Category</span>
              <span>Stock</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-gold/10">
              {filtered.map((product) => (
                <button
                  key={product._id ?? product.sku}
                  onClick={() => handleSelect(product)}
                  className="grid w-full grid-cols-4 gap-3 px-4 py-4 text-left text-sm hover:bg-cream"
                >
                  <span className="font-medium text-navy">{product.name}</span>
                  <span className="text-navy/70">{product.category}</span>
                  <span className="text-navy/70">{product.stock}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold">
                    {product.isNew ? "New" : product.stock > 0 ? "Active" : "Low"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={formState.name}
              onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Product name"
              className="rounded-xl border border-gold/30 px-3 py-2 text-sm"
            />
            <input
              value={formState.sku}
              onChange={(e) => setFormState((prev) => ({ ...prev, sku: e.target.value }))}
              placeholder="SKU"
              className="rounded-xl border border-gold/30 px-3 py-2 text-sm"
            />
            <input
              value={formState.price}
              onChange={(e) => setFormState((prev) => ({ ...prev, price: Number(e.target.value) }))}
              type="number"
              placeholder="Price"
              className="rounded-xl border border-gold/30 px-3 py-2 text-sm"
            />
            <select
              value={formState.category}
              onChange={(e) => setFormState((prev) => ({ ...prev, category: e.target.value }))}
              className="rounded-xl border border-gold/30 px-3 py-2 text-sm"
            >
              {productCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <input
              value={formState.color}
              onChange={(e) => setFormState((prev) => ({ ...prev, color: e.target.value }))}
              placeholder="Color"
              className="rounded-xl border border-gold/30 px-3 py-2 text-sm"
            />
            <input
              value={formState.material}
              onChange={(e) => setFormState((prev) => ({ ...prev, material: e.target.value }))}
              placeholder="Material"
              className="rounded-xl border border-gold/30 px-3 py-2 text-sm"
            />
            <input
              value={formState.stock}
              onChange={(e) => setFormState((prev) => ({ ...prev, stock: Number(e.target.value) }))}
              type="number"
              placeholder="Stock"
              className="rounded-xl border border-gold/30 px-3 py-2 text-sm"
            />
            <input
              value={formState.discountPercent}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, discountPercent: Number(e.target.value) }))
              }
              type="number"
              placeholder="Discount %"
              className="rounded-xl border border-gold/30 px-3 py-2 text-sm"
            />
            <input
              value={formState.tags.join(", ")}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  tags: e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean),
                }))
              }
              placeholder="Tags (comma separated)"
              className="rounded-xl border border-gold/30 px-3 py-2 text-sm md:col-span-2"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-navy/70">
              <input
                type="checkbox"
                checked={formState.isNew}
                onChange={(e) => setFormState((prev) => ({ ...prev, isNew: e.target.checked }))}
              />
              New Arrival
            </label>
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="rounded-full border border-gold/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-navy"
            >
              Preview
            </button>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-navy/60">Description</p>
            <ProductEditor
              value={formState.description}
              onChange={(value) => setFormState((prev) => ({ ...prev, description: value }))}
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-navy/60">Gallery</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {formState.images.map((image) => (
                <img key={image} src={image} alt="Uploaded" className="h-16 w-16 rounded-lg object-cover" />
              ))}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                className="text-xs"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-full border border-gold bg-navy py-3 font-semibold text-cream transition hover:bg-gold hover:text-navy disabled:opacity-60"
            >
              {saving ? "Saving..." : selected?._id ? "Update Product" : "Create Product"}
            </button>
            {selected?._id && (
              <button
                onClick={handleDelete}
                className="w-full rounded-full border border-red-300 px-4 py-2 text-sm text-red-600"
              >
                Delete Product
              </button>
            )}
          </div>
          {message && <p className="text-sm text-emerald-700">{message}</p>}
        </div>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-lg rounded-2xl bg-white p-6">
            <h2 className="font-serif text-2xl text-navy">{formState.name || "Preview"}</h2>
            <p className="mt-3 text-sm text-navy/70">Price: ৳{formState.price}</p>
            <div
              className="mt-4 max-h-48 overflow-y-auto text-sm text-navy"
              dangerouslySetInnerHTML={{ __html: formState.description || "" }}
            />
            <button
              onClick={() => setPreviewOpen(false)}
              className="mt-6 rounded-full border border-gold/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-navy"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
