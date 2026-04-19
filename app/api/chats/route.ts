import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ChatModel } from "@/lib/models/Chat";

export async function GET() {
  await connectToDatabase();
  const items = await ChatModel.find().sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST() {
  await connectToDatabase();
  const chat = await ChatModel.create({ status: "open", messages: [] });
  return NextResponse.json({ id: chat._id.toString() }, { status: 201 });
}
