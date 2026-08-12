"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/config/site";
import { generateConversationId, MAX_MESSAGE_LENGTH, type ChatMessage } from "@/lib/chat";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "sst-chat-id";
const POLL_INTERVAL = 3000;

const quickReplies = [
  "I need help placing an order",
  "What is the delivery time?",
  "Do you offer reseller / bulk pricing?",
  "What payment methods do you accept?",
];

const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/[^\d]/g, "")}`;

function getConversationId(): string {
  if (typeof window === "undefined") return generateConversationId();
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  const id = generateConversationId();
  window.localStorage.setItem(STORAGE_KEY, id);
  return id;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createLocalMessage(conversationId: string, text: string): ChatMessage {
  const now = Date.now();
  return { id: `local-${now}`, conversationId, role: "visitor", text, createdAt: now };
}

export function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [conversationId] = useState(getConversationId);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatOpen) return;
    let cancelled = false;

    const load = async (first = false) => {
      try {
        const response = await fetch(
          `/api/chat/messages?conversationId=${encodeURIComponent(conversationId)}`
        );
        if (!response.ok) return;
        const data = (await response.json()) as {
          messages?: ChatMessage[];
          whatsappEnabled?: boolean;
        };
        if (cancelled) return;
        setWhatsappEnabled(data.whatsappEnabled !== false);
        if (first) setLoading(false);
        setMessages(data.messages ?? []);
      } catch {
        if (first) setLoading(false);
      }
    };

    load(true);
    const timer = window.setInterval(() => load(), POLL_INTERVAL);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [chatOpen, conversationId]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const optimistic = createLocalMessage(conversationId, trimmed);
    setMessages((prev) => [...prev, optimistic]);
    setMessage("");
    setSending(true);

    try {
      const response = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, text: trimmed }),
      });
      const data = (await response.json().catch(() => null)) as {
        delivered?: boolean;
      } | null;
      if (!response.ok) {
        setMessages((prev) => prev.filter((item) => item.id !== optimistic.id));
      } else if (data?.delivered === false) {
        setWhatsappEnabled(false);
      }
    } catch {
      setMessages((prev) => prev.filter((item) => item.id !== optimistic.id));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3">
      <AnimatePresence>
        {chatOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[30rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-lift"
            role="dialog"
            aria-label="Support chat"
          >
            <div className="flex items-center gap-3 border-b border-border bg-surface-1 px-4 py-3.5">
              <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <span className="font-display text-sm font-extrabold">SST</span>
                <span
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background-elevated",
                    whatsappEnabled ? "bg-[#22c55e]" : "bg-muted-2"
                  )}
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">Live Chat</p>
                <p className="text-xs text-muted-2">
                  {whatsappEnabled ? "Online — replies in minutes" : "Chat is being looked after"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
                className="grid size-8 place-items-center rounded-full text-muted-2 transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-2 px-3.5 py-2.5 text-sm text-muted">
                Hi there! Welcome to {siteConfig.name}. Ask us anything and we will reply right here.
              </div>

              {loading ? (
                <div className="flex items-center gap-1.5 px-1 pt-1 text-xs text-muted-2">
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-2" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-2 [animation-delay:120ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-2 [animation-delay:240ms]" />
                </div>
              ) : null}

              {messages.map((item) =>
                item.role === "visitor" ? (
                  <div key={item.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3.5 py-2.5 text-sm text-accent-foreground">
                      <p className="whitespace-pre-wrap break-words">{item.text}</p>
                      <p className="mt-1 text-right text-[10px] opacity-70">
                        {formatTime(item.createdAt)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div key={item.id} className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-2 px-3.5 py-2.5 text-sm text-foreground">
                      <p className="whitespace-pre-wrap break-words">{item.text}</p>
                      <p className="mt-1 text-[10px] text-muted-2">
                        Support · {formatTime(item.createdAt)}
                      </p>
                    </div>
                  </div>
                )
              )}

              {!whatsappEnabled ? (
                <div className="mt-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-300">
                  Live chat is temporarily unavailable. Please message us on WhatsApp for instant
                  help.
                </div>
              ) : null}
            </div>

            <div className="mt-1 flex flex-wrap gap-2 px-4">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendMessage(reply)}
                  disabled={sending}
                  className="rounded-full border border-border px-3 py-1.5 text-left text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>

            <form
              className="flex items-center gap-2 border-t border-border px-3 py-3"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(message);
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Type your message..."
                aria-label="Your message"
                className="h-10 min-w-0 flex-1 rounded-full border border-border bg-surface-1 px-4 text-sm text-foreground placeholder:text-muted-2 focus:border-accent/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending || !message.trim()}
                aria-label="Send message"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-[#25d366] text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Send className="size-4" aria-hidden="true" />
              </button>
            </form>

            <p className="border-t border-border px-4 py-2.5 text-center text-[11px] text-muted-2">
              Your message goes straight to our WhatsApp — we reply here in the chat.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setChatOpen((open) => !open)}
        aria-label={chatOpen ? "Close support chat" : "Open support chat"}
        aria-expanded={chatOpen}
        className="relative grid size-13 place-items-center rounded-full border border-border bg-background-elevated text-foreground shadow-lift transition-colors hover:bg-surface-2"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-background-elevated bg-accent" />
      </button>

      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/40" aria-hidden="true" />
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="relative grid size-13 place-items-center rounded-full bg-[#25d366] text-white shadow-lift transition-transform hover:scale-105 active:scale-95"
        >
          <WhatsAppIcon className="size-6" />
        </a>
      </div>
    </div>
  );
}
