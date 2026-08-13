"use client";

import { useCallback, useEffect, useState } from "react";

export function useAdminFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);

  const load = useCallback(() => {
    fetch(url, { cache: "no-store" })
      .then((res) => res.json().catch(() => null).then((json) => ({ res, json })))
      .then(({ res, json }) => {
        const payload = json as (T & { error?: string }) | null;
        if (res.status === 401) {
          window.location.reload();
          return;
        }
        if (!res.ok) {
          throw new Error(payload?.error ?? "Request failed");
        }
        setData(payload as T);
        setError("");
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Request failed");
      })
      .finally(() => {
        setBusy(false);
      });
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  const reload = () => {
    setBusy(true);
    load();
  };

  return { data, error, busy, reload };
}

export async function adminPost(url: string, body?: unknown): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (res.status === 401) {
    window.location.reload();
    return { ok: false, error: "Session expired" };
  }
  if (!res.ok) return { ok: false, error: json?.error ?? "Request failed" };
  return { ok: true };
}
