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
    image: "https://github.com/user-attachments/assets/ac25831c-e1b2-49c8-b8af-7e53bb32a0d4",
    images: [
      "https://github.com/user-attachments/assets/ac25831c-e1b2-49c8-b8af-7e53bb32a0d4",
      "https://github.com/user-attachments/assets/ac25831c-e1b2-49c8-b8af-7e53bb32a0d4",
      "https://github.com/user-attachments/assets/ac25831c-e1b2-49c8-b8af-7e53bb32a0d4",
    ],
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
    image: "https://github.com/user-attachments/assets/81723817-2a6d-45fd-9ba6-da08cc44d6cf",
    images: [
      "https://github.com/user-attachments/assets/81723817-2a6d-45fd-9ba6-da08cc44d6cf",
      "https://github.com/user-attachments/assets/81723817-2a6d-45fd-9ba6-da08cc44d6cf",
      "https://github.com/user-attachments/assets/81723817-2a6d-45fd-9ba6-da08cc44d6cf",
    ],
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
    image: "https://github.com/user-attachments/assets/ce8a1c0d-89f3-4802-a1b2-0d83f6a795b1",
    images: [
      "https://github.com/user-attachments/assets/ce8a1c0d-89f3-4802-a1b2-0d83f6a795b1",
      "https://github.com/user-attachments/assets/ce8a1c0d-89f3-4802-a1b2-0d83f6a795b1",
      "https://github.com/user-attachments/assets/ce8a1c0d-89f3-4802-a1b2-0d83f6a795b1",
    ],
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
    image: "https://github.com/user-attachments/assets/0512710f-4927-4851-987c-850d070e93ec",
    images: [
      "https://github.com/user-attachments/assets/0512710f-4927-4851-987c-850d070e93ec",
      "https://github.com/user-attachments/assets/0512710f-4927-4851-987c-850d070e93ec",
      "https://github.com/user-attachments/assets/0512710f-4927-4851-987c-850d070e93ec",
    ],
    description:
      "Compact daily wallet with signature monogram detailing and practical storage.",
    discountPercent: 15,
    stock: 12,
    isNewArrival: false,
    rating: 4.7,
    tags: ["wallet", "monogram"],
    badge: "Best Seller",
  },
];

export const formatPrice = (value: number) => `৳${value.toLocaleString("en-BD")}`;
export const getDiscountedPrice = (price: number, discountPercent: number) =>
  Math.round(price - price * (discountPercent / 100));
