import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ChatModel } from "@/lib/models/Chat";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accessKey = request.headers.get("x-chat-key");
  if (!accessKey) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await connectToDatabase();
  const chat = await ChatModel.findById(id).lean();
  if (!chat) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (chat.accessKey !== accessKey) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { accessKey: _, ...safeChat } = chat;
  return NextResponse.json({ item: safeChat });
}
