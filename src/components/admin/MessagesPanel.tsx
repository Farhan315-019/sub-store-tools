"use client";

import { Mail, Trash2 } from "lucide-react";
import type { MessageRecord } from "@/lib/store";
import { useAdminFetch } from "./useAdminFetch";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function MessagesPanel() {
  const { data, busy, error, reload } = useAdminFetch<{ messages: MessageRecord[] }>(
    "/api/admin/messages"
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (res.status === 401) {
      window.location.reload();
      return;
    }
    if (res.ok) void reload();
  };

  const messages = data?.messages ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Messages</h1>
        <p className="mt-1 text-sm text-muted">
          Enquiries sent through the contact form on the site.
        </p>
      </div>

      <div className="rounded-card-lg border border-border bg-surface">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h2 className="font-display text-base font-bold text-foreground">
            Contact Messages <span className="font-normal text-muted">({messages.length})</span>
          </h2>
        </div>

        {busy ? (
          <p className="px-6 py-8 text-sm text-muted">Loading messages...</p>
        ) : error ? (
          <p className="px-6 py-8 text-sm text-danger">{error}</p>
        ) : messages.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted">No messages yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {messages.map((message) => (
              <li key={message.id} className="px-5 py-4 sm:px-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-foreground">{message.name}</p>
                      <span className="text-xs text-muted-2">· {message.email}</span>
                      {message.phone ? (
                        <span className="text-xs text-muted-2">· {message.phone}</span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-muted-2">
                      <Mail className="mr-1 inline size-3 align-[-1px]" aria-hidden="true" />
                      {formatDate(message.createdAt)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">{message.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(message.id)}
                    aria-label={`Delete message from ${message.name}`}
                    className="grid size-9 shrink-0 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-danger/40 hover:text-danger"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
