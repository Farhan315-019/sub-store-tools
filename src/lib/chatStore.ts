import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type { ChatMessage, ChatRole } from "./chat";

type Conversation = {
  id: string;
  messages: ChatMessage[];
  lastActivity: number;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "chat.json");

const memoryStore = new Map<string, Conversation>();

function readStore(): Record<string, Conversation> {
  if (existsSync(DATA_FILE)) {
    try {
      return JSON.parse(readFileSync(DATA_FILE, "utf8")) as Record<string, Conversation>;
    } catch {
      // fall through to memory
    }
  }
  return Object.fromEntries(memoryStore);
}

function writeStore(store: Record<string, Conversation>) {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(store), "utf8");
    memoryStore.clear();
  } catch {
    memoryStore.clear();
    for (const entry of Object.entries(store)) {
      memoryStore.set(entry[0], entry[1]);
    }
  }
}

export function addMessage(conversationId: string, role: ChatRole, text: string): ChatMessage {
  const store = readStore();
  const now = Date.now();
  const conversation = store[conversationId] ?? { id: conversationId, messages: [], lastActivity: 0 };
  const message: ChatMessage = {
    id: `${conversationId}-${now}-${conversation.messages.length}`,
    conversationId,
    role,
    text,
    createdAt: now,
  };
  conversation.messages.push(message);
  conversation.lastActivity = now;
  store[conversationId] = conversation;
  writeStore(store);
  return message;
}

export function getMessages(conversationId: string): ChatMessage[] {
  const conversation = readStore()[conversationId];
  return conversation ? conversation.messages : [];
}

export type ConversationSummary = {
  id: string;
  lastActivity: number;
  messageCount: number;
  lastMessage: Pick<ChatMessage, "role" | "text" | "createdAt"> | null;
};

export function listConversations(): ConversationSummary[] {
  const store = readStore();
  return Object.values(store)
    .map((conversation) => {
      const last = conversation.messages[conversation.messages.length - 1] ?? null;
      return {
        id: conversation.id,
        lastActivity: conversation.lastActivity,
        messageCount: conversation.messages.length,
        lastMessage: last
          ? { role: last.role, text: last.text, createdAt: last.createdAt }
          : null,
      };
    })
    .sort((a, b) => b.lastActivity - a.lastActivity);
}

export function getRecentConversationId(maxAgeMs: number): string | undefined {
  const store = readStore();
  const now = Date.now();
  let best: Conversation | undefined;
  for (const conversation of Object.values(store)) {
    if (now - conversation.lastActivity > maxAgeMs) continue;
    if (!best || conversation.lastActivity > best.lastActivity) {
      best = conversation;
    }
  }
  return best?.id;
}
