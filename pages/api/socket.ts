import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { connectToDatabase } from "@/lib/db";
import { ChatModel } from "@/lib/models/Chat";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: {
      io?: Server;
    };
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      socket.on("chat:join", (chatId: string) => {
        if (chatId) socket.join(chatId);
      });

      socket.on("chat:message", async (payload: { chatId: string; sender: string; text: string }) => {
        const { chatId, sender, text } = payload;
        if (!chatId || !text) return;
        await connectToDatabase();
        await ChatModel.findByIdAndUpdate(chatId, {
          $push: { messages: { sender, text } },
          $set: { status: "open" },
        });
        io.to(chatId).emit("chat:message", { sender, text, chatId, createdAt: new Date().toISOString() });
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
