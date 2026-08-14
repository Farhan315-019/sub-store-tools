"use client";

import { KeyRound, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";
import { adminSend } from "./useAdminFetch";

type SettingsPanelProps = {
  onLogout: () => void;
};

export function SettingsPanel({ onLogout }: SettingsPanelProps) {
  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/account", { cache: "no-store" })
      .then((res) => res.json())
      .then((json: { username?: string }) => {
        if (!cancelled && typeof json.username === "string") {
          setUsername(json.username);
          setOriginalUsername(json.username);
        }
      })
      .catch(() => {
        // keep empty fields if the request fails
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSaveCredentials = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);

    const trimmedUsername = username.trim();
    const changingPassword = newPassword.length > 0 || confirmPassword.length > 0;

    if (!trimmedUsername) {
      setMessage({ type: "error", text: "Username cannot be empty." });
      return;
    }
    if (changingPassword) {
      if (newPassword.length < 6) {
        setMessage({ type: "error", text: "New password must be at least 6 characters." });
        return;
      }
      if (newPassword !== confirmPassword) {
        setMessage({ type: "error", text: "New passwords do not match." });
        return;
      }
    }
    if (trimmedUsername === originalUsername && !changingPassword) {
      setMessage({ type: "error", text: "Nothing to update. Change the username or password first." });
      return;
    }

    setBusy(true);
    const result = await adminSend("/api/admin/account", "PATCH", {
      currentPassword,
      newUsername: trimmedUsername,
      newPassword: changingPassword ? newPassword : undefined,
    });
    setBusy(false);

    if (!result.ok) {
      setMessage({ type: "error", text: result.error ?? "Failed to update credentials." });
      return;
    }

    setOriginalUsername(trimmedUsername);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage({ type: "success", text: "Credentials updated successfully." });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted">Change your admin username and password, then sign out.</p>
      </div>

      <form
        onSubmit={handleSaveCredentials}
        className="max-w-md rounded-card-lg border border-border bg-surface p-5 sm:p-6"
      >
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <KeyRound className="size-4 text-accent-text" aria-hidden="true" />
          Admin Credentials
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          <Field label="Username" htmlFor="admin-username">
            <Input
              id="admin-username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </Field>
          <Field label="Current password" htmlFor="admin-current-password">
            <Input
              id="admin-current-password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
            />
          </Field>
          <Field label="New password" htmlFor="admin-new-password" hint="Leave blank to keep your current password.">
            <Input
              id="admin-new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Min 6 characters"
            />
          </Field>
          <Field label="Confirm new password" htmlFor="admin-confirm-password">
            <Input
              id="admin-confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Min 6 characters"
            />
          </Field>
        </div>

        {message ? (
          <p
            role="alert"
            className={
              message.type === "success"
                ? "mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600"
                : "mt-3 rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger"
            }
          >
            {message.text}
          </p>
        ) : null}

        <Button type="submit" disabled={busy} className="mt-5">
          <KeyRound className="size-4" aria-hidden="true" />
          {busy ? "Saving..." : "Save Changes"}
        </Button>
      </form>

      <div className="max-w-md rounded-card-lg border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-display text-base font-bold text-foreground">Session</h2>
        <p className="mt-1 text-sm text-muted">Sign out of the admin panel.</p>
        <Button variant="outline" onClick={onLogout} className="mt-4">
          <LogOut className="size-4" aria-hidden="true" />
          Logout
        </Button>
      </div>
    </div>
  );
}
