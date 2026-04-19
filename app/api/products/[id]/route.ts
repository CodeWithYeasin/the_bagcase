import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  await connectToDatabase();
  const product = await ProductModel.findById(params.id).lean();
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item: product });
}

export async function PUT(request: Request, { params }: Params) {
  await connectToDatabase();
  const body = await request.json();
  const product = await ProductModel.findByIdAndUpdate(params.id, body, { new: true });
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item: product });
}

export async function DELETE(_: Request, { params }: Params) {
  await connectToDatabase();
  await ProductModel.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
