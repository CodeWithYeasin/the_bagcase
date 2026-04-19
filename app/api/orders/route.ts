import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/lib/models/Order";
import { ProductModel } from "@/lib/models/Product";
import { getDiscountedPrice, products } from "@/lib/products";

type NormalizedItem = {
  productId: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
const MAX_QUANTITY = Number.isFinite(Number(process.env.MAX_ORDER_QUANTITY))
  ? Number(process.env.MAX_ORDER_QUANTITY)
  : 50;
const MAX_PRICE = Number.isFinite(Number(process.env.MAX_PRODUCT_PRICE))
  ? Number(process.env.MAX_PRODUCT_PRICE)
  : 100000;

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ items: [] });
  }
  await connectToDatabase();
  const items = await OrderModel.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await connectToDatabase();

  const requestedItems: Array<{ productId: string | number; quantity?: number }> = Array.isArray(
    body.items
  )
    ? body.items
    : [];
  const objectIds = requestedItems
    .map((item) => item.productId)
    .filter((id) => typeof id === "string" && id.length === 24);

  const dbProducts = objectIds.length
    ? await ProductModel.find({ _id: { $in: objectIds } }).lean()
    : [];
  const dbMap = new Map(dbProducts.map((product) => [product._id.toString(), product]));

  const normalizedItems = requestedItems
    .map((item) => {
      const quantity = Math.min(MAX_QUANTITY, Math.max(1, Number(item.quantity) || 1));
      const productId = item.productId;
      const dbProduct =
        typeof productId === "string" ? dbMap.get(productId) : undefined;
      const localProduct =
        typeof productId === "number" || typeof productId === "string"
          ? products.find((product) => product.id === Number(productId))
          : undefined;
      const product = dbProduct ?? localProduct;
      if (!product) return null;
      const price = Math.min(
        MAX_PRICE,
        getDiscountedPrice(product.price, product.discountPercent ?? 0)
      );
      return {
        productId,
        name: product.name,
        price,
        quantity,
        image: product.image,
      } as NormalizedItem;
    })
    .filter((item): item is NormalizedItem => Boolean(item));

  if (!normalizedItems.length) {
    return NextResponse.json({ error: "No valid items provided." }, { status: 400 });
  }

  const subtotal = normalizedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  if (!Number.isFinite(subtotal)) {
    return NextResponse.json({ error: "Invalid order total." }, { status: 400 });
  }
  const shipping = subtotal > 0 ? 200 : 0;
  const total = subtotal + shipping;

  const order = await OrderModel.create({
    userId: session.user.id,
    items: normalizedItems,
    subtotal,
    shipping,
    total,
    shippingAddress: body.shippingAddress,
  });

  return NextResponse.json({ item: order }, { status: 201 });
}
