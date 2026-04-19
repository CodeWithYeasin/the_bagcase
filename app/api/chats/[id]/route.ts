import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ChatModel } from "@/lib/models/Chat";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectToDatabase();
  const chat = await ChatModel.findById(id).lean();
  if (!chat) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item: chat });
}
