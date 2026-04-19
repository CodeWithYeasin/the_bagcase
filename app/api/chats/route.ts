import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { ChatModel } from "@/lib/models/Chat";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await connectToDatabase();
  const items = await ChatModel.find().sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST() {
  await connectToDatabase();
  const chat = await ChatModel.create({ status: "open", messages: [] });
  return NextResponse.json({ id: chat._id.toString() }, { status: 201 });
}
