export const productCategories = ["Briefcase", "Duffel Bag", "Accessories", "Wallet"] as const;
export const defaultColorOptions = ["Navy Blue", "Brown", "Black", "Gold", "Navy/Gold"] as const;

export type ProductCategory = (typeof productCategories)[number];

export type Product = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  category: ProductCategory;
  color: string;
  material: string;
  image: string;
  images: string[];
  description: string;
  discountPercent: number;
  stock: number;
  isNewArrival: boolean;
  rating: number;
  tags: string[];
  badge?: "New Arrival" | "Best Seller";
};

export const products: Product[] = [
  {
    id: 1,
    name: "Executive Leather Briefcase",
    slug: "executive-leather-briefcase",
    sku: "TBC-BR-001",
    price: 8500,
    category: "Briefcase",
    color: "Navy Blue",
    material: "Full-grain leather",
    image: "/products/briefcase-navy.svg",
    images: ["/products/briefcase-navy.svg", "/products/briefcase-navy.svg", "/products/briefcase-navy.svg"],
    description:
      "Crafted for modern executives with organized compartments and refined detailing.",
    discountPercent: 12,
    stock: 18,
    isNewArrival: false,
    rating: 4.8,
    tags: ["executive", "leather", "travel"],
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Luxury Travel Duffel",
    slug: "luxury-travel-duffel",
    sku: "TBC-DF-002",
    price: 6200,
    category: "Duffel Bag",
    color: "Brown",
    material: "Genuine leather",
    image: "/products/duffel-brown.svg",
    images: ["/products/duffel-brown.svg", "/products/duffel-brown.svg", "/products/duffel-brown.svg"],
    description:
      "A premium weekender duffel balancing sophistication, comfort, and travel-ready utility.",
    discountPercent: 8,
    stock: 24,
    isNewArrival: true,
    rating: 4.6,
    tags: ["weekender", "leather", "travel"],
    badge: "New Arrival",
  },
  {
    id: 3,
    name: "Silk Travel Scarf",
    slug: "silk-travel-scarf",
    sku: "TBC-AC-003",
    price: 1800,
    category: "Accessories",
    color: "Navy/Gold",
    material: "Pure silk",
    image: "/products/scarf.svg",
    images: ["/products/scarf.svg", "/products/scarf.svg", "/products/scarf.svg"],
    description:
      "Lightweight silk scarf designed to elevate every travel and evening ensemble.",
    discountPercent: 0,
    stock: 40,
    isNewArrival: true,
    rating: 4.5,
    tags: ["silk", "accessory"],
  },
  {
    id: 4,
    name: "Monogram Wallet",
    slug: "monogram-wallet",
    sku: "TBC-WL-004",
    price: 3500,
    category: "Wallet",
    color: "Brown",
    material: "Leather",
    image: "/products/wallet.svg",
    images: ["/products/wallet.svg", "/products/wallet.svg", "/products/wallet.svg"],
    description:
      "Compact daily wallet with signature monogram detailing and practical storage.",
    discountPercent: 15,
    stock: 12,
    isNewArrival: false,
    rating: 4.7,
    tags: ["wallet", "monogram"],
    badge: "Best Seller",
  },
  {
    id: 5,
    name: "Vintage Compass Keychain",
    slug: "vintage-compass-keychain",
    sku: "TBC-AC-005",
    price: 950,
    category: "Accessories",
    color: "Gold",
    material: "Brass",
    image: "/products/compass.svg",
    images: ["/products/compass.svg", "/products/compass.svg", "/products/compass.svg"],
    description:
      "A collectible brass keychain inspired by timeless exploration heritage.",
    discountPercent: 5,
    stock: 60,
    isNewArrival: false,
    rating: 4.4,
    tags: ["keychain", "gift"],
  },
  {
    id: 6,
    name: "Leather Journal Planner",
    slug: "leather-journal-planner",
    sku: "TBC-AC-006",
    price: 2200,
    category: "Accessories",
    color: "Brown",
    material: "Leather",
    image: "/products/journal.svg",
    images: ["/products/journal.svg", "/products/journal.svg", "/products/journal.svg"],
    description:
      "Elegant travel journal planner with durable leather cover and premium paper stock.",
    discountPercent: 10,
    stock: 30,
    isNewArrival: true,
    rating: 4.6,
    tags: ["journal", "planner"],
    badge: "New Arrival",
  },
];

export const formatPrice = (value: number) => `৳${value.toLocaleString("en-BD")}`;
export const getDiscountedPrice = (price: number, discountPercent: number) =>
  Math.round(price - price * (discountPercent / 100));
