import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as NetServer } from "http";
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
    const httpServer = res.socket.server as unknown as NetServer;
    const io = new Server(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      socket.on("chat:join", (chatId: string) => {
        if (chatId) socket.join(chatId);
      });

      socket.on("chat:message", async (payload: { chatId: string; sender: string; text: string }) => {
        const { chatId, sender, text } = payload;
        const sanitizedText = text?.trim();
        if (!chatId) {
          socket.emit("chat:error", { message: "Missing chatId." });
          return;
        }
        if (!sanitizedText) {
          socket.emit("chat:error", { message: "Message cannot be empty." });
          return;
        }
        if (sender !== "user" && sender !== "admin") {
          socket.emit("chat:error", { message: "Invalid sender." });
          return;
        }
        await connectToDatabase();
        await ChatModel.findByIdAndUpdate(chatId, {
          $push: { messages: { sender, text: sanitizedText } },
          $set: { status: "open" },
        });
        io.to(chatId).emit("chat:message", {
          sender,
          text: sanitizedText,
          chatId,
          createdAt: new Date().toISOString(),
        });
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
