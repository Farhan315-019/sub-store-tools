"use client";

import { ArrowLeft, MessagesSquare, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/chat";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat";
import { cn } from "@/lib/utils";

type ConversationSummary = {
  id: string;
  lastActivity: number;
  messageCount: number;
  lastMessage: { role: "visitor" | "owner"; text: string; createdAt: number } | null;
};

const LIST_POLL = 5000;
const MSG_POLL = 3000;

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatRelative(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function formatPreview(text: string): string {
  return text.length > 80 ? `${text.slice(0, 80)}…` : text;
}

export function ChatPanel() {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((conversation) => conversation.id === activeId) ?? null;

  useEffect(() => {
    let cancelled = false;

    const load = async (first = false) => {
      try {
        const response = await fetch("/api/chat/conversations");
        if (!response.ok) return;
        const data = (await response.json()) as { conversations?: ConversationSummary[] };
        if (cancelled) return;
        if (first) setLoadingList(false);
        setConversations(data.conversations ?? []);
      } catch {
        if (first) setLoadingList(false);
      }
    };

    load(true);
    const timer = window.setInterval(() => load(), LIST_POLL);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!activeId) return;
    let cancelled = false;

    const load = async (first = false) => {
      try {
        const response = await fetch(
          `/api/chat/messages?conversationId=${encodeURIComponent(activeId)}`
        );
        if (!response.ok) return;
        const data = (await response.json()) as { messages?: ChatMessage[] };
        if (cancelled) return;
        if (first) setLoadingMsg(false);
        setMessages(data.messages ?? []);
      } catch {
        if (first) setLoadingMsg(false);
      }
    };

    load(true);
    const timer = window.setInterval(() => load(), MSG_POLL);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [activeId]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loadingMsg]);

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || sending || !activeId) return;

    const optimistic: ChatMessage = {
      id: `local-${Date.now()}`,
      conversationId: activeId,
      role: "owner",
      text: trimmed,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setMessage("");
    setSending(true);

    try {
      const response = await fetch("/api/chat/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: activeId, text: trimmed }),
      });
      if (!response.ok) {
        setMessages((prev) => prev.filter((item) => item.id !== optimistic.id));
      }
    } catch {
      setMessages((prev) => prev.filter((item) => item.id !== optimistic.id));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Chat</h1>
        <p className="mt-1 text-sm text-muted">
          Reply to site visitors who message you through the live chat.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-card-lg border border-border bg-surface lg:grid-cols-[17rem_1fr]">
        <div className={cn("border-border", active ? "hidden lg:block lg:border-r" : "block")}>
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">Conversations</h2>
            <span className="text-xs text-muted-2">{conversations.length}</span>
          </div>
          <div className="max-h-[32rem] overflow-y-auto">
            {loadingList ? (
              <p className="px-4 py-8 text-sm text-muted-2">Loading conversations...</p>
            ) : conversations.length === 0 ? (
              <p className="px-4 py-8 text-sm text-muted-2">No conversations yet.</p>
            ) : (
              <ul>
                {conversations.map((conversation) => (
                  <li key={conversation.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(conversation.id)}
                      className={cn(
                        "flex w-full items-start gap-3 border-b border-border/60 px-4 py-3 text-left transition-colors hover:bg-surface-2",
                        conversation.id === activeId && "bg-accent-soft"
                      )}
                    >
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-surface-3 text-foreground">
                        <MessagesSquare className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="truncate text-sm font-semibold text-foreground">
                            {conversation.id}
                          </span>
                          <span className="shrink-0 text-[10px] text-muted-2">
                            {formatRelative(conversation.lastActivity)}
                          </span>
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted">
                          {conversation.lastMessage
                            ? `${conversation.lastMessage.role === "owner" ? "You: " : ""}${formatPreview(conversation.lastMessage.text)}`
                            : "New conversation"}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={cn("h-[32rem]", active ? "block" : "hidden lg:block")}>
          {active ? (
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  aria-label="Back to conversations"
                  className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground lg:hidden"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <div>
                  <p className="text-sm font-semibold text-foreground">{active.id}</p>
                  <p className="text-xs text-muted-2">
                    {active.messageCount} message{active.messageCount === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div ref={listRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
                {loadingMsg ? (
                  <p className="text-sm text-muted-2">Loading messages...</p>
                ) : messages.length === 0 ? (
                  <p className="text-sm text-muted-2">No messages in this conversation yet.</p>
                ) : (
                  messages.map((item) =>
                    item.role === "owner" ? (
                      <div key={item.id} className="flex justify-end">
                        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-accent px-3.5 py-2.5 text-sm text-accent-foreground">
                          <p className="whitespace-pre-wrap break-words">{item.text}</p>
                          <p className="mt-1 text-right text-[10px] opacity-70">
                            {formatTime(item.createdAt)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div key={item.id} className="flex justify-start">
                        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-surface-2 px-3.5 py-2.5 text-sm text-foreground">
                          <p className="whitespace-pre-wrap break-words">{item.text}</p>
                          <p className="mt-1 text-[10px] text-muted-2">
                            Visitor · {formatTime(item.createdAt)}
                          </p>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>

              <form
                className="flex items-center gap-2 border-t border-border px-3 py-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage();
                }}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={MAX_MESSAGE_LENGTH}
                  placeholder="Type your reply..."
                  aria-label="Your reply"
                  className="h-10 min-w-0 flex-1 rounded-full border border-border bg-surface-1 px-4 text-sm text-foreground placeholder:text-muted-2 focus:border-accent/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={sending || !message.trim()}
                  aria-label="Send reply"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <Send className="size-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          ) : (
            <div className="grid h-full place-items-center px-6 text-center">
              <div>
                <MessagesSquare className="mx-auto size-10 text-muted-2" aria-hidden="true" />
                <p className="mt-3 text-sm text-muted">Select a conversation to start replying.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
