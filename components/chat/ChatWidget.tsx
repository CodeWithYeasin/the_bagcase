"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { FiMessageSquare, FiSend } from "react-icons/fi";

type ChatMessage = {
  sender: "user" | "admin";
  text: string;
  createdAt?: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!open) return;

    const init = async () => {
      const stored = window.localStorage.getItem("bagcase.chat-id");
      if (stored) {
        setChatId(stored);
        return;
      }
      const res = await fetch("/api/chats", { method: "POST" });
      const data = await res.json();
      if (data.id) {
        window.localStorage.setItem("bagcase.chat-id", data.id);
        setChatId(data.id);
      }
    };

    init();
  }, [open]);

  useEffect(() => {
    if (!open || !chatId) return;
    const loadHistory = async () => {
      const res = await fetch(`/api/chats/${chatId}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.item?.messages) setMessages(data.item.messages);
    };
    loadHistory();

    if (!socketRef.current) {
      fetch("/api/socket");
      socketRef.current = io({ path: "/api/socket" });
    }
    const socket = socketRef.current;
    socket.emit("chat:join", chatId);
    socket.on("chat:message", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });
    socket.on("chat:error", (payload: { message: string }) => {
      setError(payload.message);
    });

    return () => {
      socket.off("chat:message");
      socket.off("chat:error");
    };
  }, [open, chatId]);

  const handleSend = () => {
    if (!input.trim() || !chatId || !socketRef.current) return;
    socketRef.current.emit("chat:message", { chatId, sender: "user", text: input });
    setInput("");
  };

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {open ? (
        <div className="w-80 overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.2)]">
          <div className="flex items-center justify-between border-b border-gold/20 bg-navy px-4 py-3 text-cream">
            <span className="text-sm font-semibold">Live Concierge</span>
            <button onClick={() => setOpen(false)} className="text-xs uppercase tracking-[0.2em]">
              Close
            </button>
          </div>
          <div className="max-h-64 space-y-2 overflow-y-auto p-4 text-sm">
            {messages.length === 0 ? (
              <p className="text-navy/60">Start a conversation with our team.</p>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${chatId ?? "chat"}-${message.createdAt ?? "now"}-${index}`}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`rounded-2xl px-3 py-2 ${
                      message.sender === "user" ? "bg-navy text-cream" : "bg-cream text-navy"
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))
            )}
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>
          <div className="flex items-center gap-2 border-t border-gold/20 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
              className="flex-1 rounded-full border border-gold/20 px-3 py-2 text-xs"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              onClick={handleSend}
              className="rounded-full border border-gold bg-navy p-2 text-cream"
              aria-label="Send"
            >
              <FiSend size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open live chat"
          className="flex items-center gap-2 rounded-full bg-navy px-4 py-3 text-sm font-semibold text-cream shadow-lg transition hover:scale-105"
        >
          <FiMessageSquare size={18} />
          Live Chat
        </button>
      )}
    </div>
  );
}
