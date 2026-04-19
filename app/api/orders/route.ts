import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/lib/models/Order";

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

  const order = await OrderModel.create({
    userId: session.user.id,
    items: body.items ?? [],
    subtotal: body.subtotal ?? 0,
    shipping: body.shipping ?? 0,
    total: body.total ?? 0,
    shippingAddress: body.shippingAddress,
  });

  return NextResponse.json({ item: order }, { status: 201 });
}
