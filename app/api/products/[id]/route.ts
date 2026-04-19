import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectToDatabase();
  const product = await ProductModel.findById(id).lean();
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item: product });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectToDatabase();
  const body = await request.json();
  const product = await ProductModel.findByIdAndUpdate(id, body, { new: true });
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item: product });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectToDatabase();
  await ProductModel.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
