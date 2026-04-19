import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";

export async function GET() {
  await connectToDatabase();
  const items = await ProductModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await connectToDatabase();
  const body = await request.json();

  if (!body?.name || !body?.price || !body?.category) {
    return NextResponse.json(
      { error: "Missing required fields: name, price, or category." },
      { status: 400 }
    );
  }

  const product = await ProductModel.create(body);
  return NextResponse.json({ item: product }, { status: 201 });
}
