import { siteConfig } from "@/config/site";

export type WhatsAppConfig = {
  enabled: boolean;
  token: string;
  ownerNumber: string;
};

export function getWhatsAppConfig(): WhatsAppConfig {
  const token = process.env.WHAPI_API_TOKEN ?? "";
  const ownerNumber = (process.env.WHAPI_OWNER_NUMBER ?? siteConfig.whatsapp).replace(/[^\d]/g, "");
  return { enabled: Boolean(token), token, ownerNumber };
}

export function normalizeNumber(input: string): string {
  return input.replace(/[^\d]/g, "").replace(/^0+/, "");
}

export async function sendWhatsAppText(to: string, text: string): Promise<boolean> {
  const { enabled, token } = getWhatsAppConfig();
  if (!enabled) return false;
  try {
    const response = await fetch("https://gate.whapi.cloud/messages/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ to, text }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export type InboundMessage = {
  from: string;
  text: string;
  quotedText: string | null;
  direction: "incoming" | "outgoing" | "unknown";
};

export function parseInboundPayload(payload: unknown): InboundMessage | null {
  if (!payload || typeof payload !== "object") return null;
  const messages = (payload as { messages?: unknown[] }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const first = messages[0] as {
    from?: string;
    type?: string;
    text?: { body?: string };
    context?: { text?: string };
    direction?: string;
  };
  if (!first || first.type !== "text") return null;
  const text = first.text?.body ?? "";
  if (!text) return null;

  const direction =
    first.direction === "incoming" || first.direction === "outgoing" ? first.direction : "unknown";

  return {
    from: first.from ?? "",
    text,
    quotedText: first.context?.text ?? null,
    direction,
  };
}
