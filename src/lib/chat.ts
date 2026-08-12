export type ChatRole = "visitor" | "owner";

export type ChatMessage = {
  id: string;
  conversationId: string;
  role: ChatRole;
  text: string;
  createdAt: number;
};

export const MAX_MESSAGE_LENGTH = 1000;

export const REF_PATTERN = /\b(SST-[A-Z0-9]{6})\b/i;

export function isValidConversationId(id: string): boolean {
  return REF_PATTERN.test(id);
}

export function generateConversationId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `SST-${code}`;
}

export function extractRefId(text: string | null | undefined): string | null {
  if (!text) return null;
  const match = text.match(REF_PATTERN);
  return match ? match[1].toUpperCase() : null;
}

export function buildInquiryMessage(refId: string, text: string): string {
  return [
    "🛒 New site inquiry",
    `Visitor #${refId}`,
    "",
    `“${text}”`,
    "",
    "Reply (quote) this message to answer the visitor in the site chat.",
  ].join("\n");
}
