"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type ChatMessage = {
  sender: "user" | "admin";
  text: string;
  createdAt?: string;
};

type ChatThread = {
  _id: string;
  status: string;
  messages: ChatMessage[];
  accessKey: string;
};

export default function AdminChatPage() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [active, setActive] = useState<ChatThread | null>(null);
  const [input, setInput] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const loadThreads = useCallback(async () => {
    const res = await fetch("/api/chats");
    const data = await res.json();
    setThreads(data.items ?? []);
    setActive((prev) => prev ?? data.items?.[0] ?? null);
  }, []);

  useEffect(() => {
    loadThreads();
  }, [loadThreads]);

  useEffect(() => {
    if (!active?._id) return;
    fetch("/api/socket");
    if (!socketRef.current) {
      socketRef.current = io({ path: "/api/socket" });
    }
    const socket = socketRef.current;
    socket.emit("chat:join", active._id);
    socket.on("chat:message", (message: ChatMessage & { chatId: string }) => {
      if (message.chatId !== active._id) return;
      setActive((prev) => (prev ? { ...prev, messages: [...prev.messages, message] } : prev));
    });
    return () => {
      socket.off("chat:message");
    };
  }, [active?._id]);

  const handleSend = () => {
    if (!input.trim() || !active?._id || !active.accessKey || !socketRef.current) return;
    socketRef.current.emit("chat:message", {
      chatId: active._id,
      chatKey: active.accessKey,
      sender: "admin",
      text: input,
    });
    setInput("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-2xl border border-gold/20 bg-white p-4">
        <h2 className="font-serif text-2xl text-navy">Conversations</h2>
        <div className="mt-4 space-y-2">
          {threads.map((thread) => {
            const lastMessage = thread.messages?.[thread.messages.length - 1];
            const isUnread = lastMessage?.sender === "user";
            return (
            <button
              key={thread._id}
              onClick={() => setActive(thread)}
              className={`w-full rounded-xl px-3 py-3 text-left text-sm ${
                active?._id === thread._id ? "bg-navy text-cream" : "bg-cream text-navy"
              }`}
            >
              <p className="font-medium">Chat #{thread._id.slice(-5)}</p>
              <div className="mt-1 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-gold">
                <span>{thread.status}</span>
                {isUnread && <span className="rounded-full bg-gold/30 px-2 py-1 text-[10px] text-navy">New</span>}
              </div>
            </button>
          );
          })}
        </div>
      </aside>

      <section className="rounded-2xl border border-gold/20 bg-white p-6">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Live Chat</p>
            <h1 className="font-serif text-2xl text-navy">Support Desk</h1>
          </div>
          <button onClick={loadThreads} className="rounded-full border border-gold/30 px-4 py-2 text-xs">
            Refresh
          </button>
        </header>

        <div className="mt-6 max-h-[400px] space-y-3 overflow-y-auto text-sm">
          {active?.messages?.length ? (
            active.messages.map((message, index) => (
              <div
                key={`${message.createdAt ?? "msg"}-${index}`}
                className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`rounded-2xl px-3 py-2 ${
                    message.sender === "admin" ? "bg-navy text-cream" : "bg-cream text-navy"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))
          ) : (
            <p className="text-navy/60">Select a conversation to start responding.</p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Reply to customer"
            className="flex-1 rounded-full border border-gold/30 px-4 py-2 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            className="rounded-full border border-gold bg-navy px-5 py-2 text-sm font-semibold text-cream"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
}
