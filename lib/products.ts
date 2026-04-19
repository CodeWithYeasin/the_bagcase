export type Product = {
  id: number;
  name: string;
  price: number;
  category: "Briefcase" | "Duffel Bag" | "Accessories" | "Wallet";
  color: string;
  material: string;
  image: string;
  description: string;
  badge?: "New Arrival" | "Best Seller";
};

export const products: Product[] = [
  {
    id: 1,
    name: "Executive Leather Briefcase",
    price: 8500,
    category: "Briefcase",
    color: "Navy Blue",
    material: "Full-grain leather",
    image: "/products/briefcase-navy.svg",
    description:
      "Crafted for modern executives with organized compartments and refined detailing.",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Luxury Travel Duffel",
    price: 6200,
    category: "Duffel Bag",
    color: "Brown",
    material: "Genuine leather",
    image: "/products/duffel-brown.svg",
    description:
      "A premium weekender duffel balancing sophistication, comfort, and travel-ready utility.",
    badge: "New Arrival",
  },
  {
    id: 3,
    name: "Silk Travel Scarf",
    price: 1800,
    category: "Accessories",
    color: "Navy/Gold",
    material: "Pure silk",
    image: "/products/scarf.svg",
    description:
      "Lightweight silk scarf designed to elevate every travel and evening ensemble.",
  },
  {
    id: 4,
    name: "Monogram Wallet",
    price: 3500,
    category: "Wallet",
    color: "Brown",
    material: "Leather",
    image: "/products/wallet.svg",
    description:
      "Compact daily wallet with signature monogram detailing and practical storage.",
    badge: "Best Seller",
  },
  {
    id: 5,
    name: "Vintage Compass Keychain",
    price: 950,
    category: "Accessories",
    color: "Gold",
    material: "Brass",
    image: "/products/compass.svg",
    description:
      "A collectible brass keychain inspired by timeless exploration heritage.",
  },
  {
    id: 6,
    name: "Leather Journal Planner",
    price: 2200,
    category: "Accessories",
    color: "Brown",
    material: "Leather",
    image: "/products/journal.svg",
    description:
      "Elegant travel journal planner with durable leather cover and premium paper stock.",
    badge: "New Arrival",
  },
];

export const formatPrice = (value: number) => `৳${value.toLocaleString("en-BD")}`;
