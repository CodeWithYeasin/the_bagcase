import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";

export async function GET() {
  await connectToDatabase();
  const items = await ProductModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();

  if (!body?.name || !body?.price || !body?.category) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const product = await ProductModel.create(body);
  return NextResponse.json({ item: product }, { status: 201 });
}
