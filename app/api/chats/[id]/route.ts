import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ChatModel } from "@/lib/models/Chat";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  await connectToDatabase();
  const chat = await ChatModel.findById(params.id).lean();
  if (!chat) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item: chat });
}
