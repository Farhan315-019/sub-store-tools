"use client";

import { KeyRound, LogOut } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";
import { adminPost } from "./useAdminFetch";

type SettingsPanelProps = {
  onLogout: () => void;
};

export function SettingsPanel({ onLogout }: SettingsPanelProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const handleChangePassword = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    setBusy(true);
    const result = await adminPost("/api/admin/change-password", {
      currentPassword,
      newPassword,
    });
    setBusy(false);

    if (!result.ok) {
      setMessage({ type: "error", text: result.error ?? "Failed to change password." });
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage({ type: "success", text: "Password changed successfully." });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted">Change your admin password and sign out.</p>
      </div>

      <form
        onSubmit={handleChangePassword}
        className="max-w-md rounded-card-lg border border-border bg-surface p-5 sm:p-6"
      >
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <KeyRound className="size-4 text-accent-text" aria-hidden="true" />
          Change Password
        </h2>
        <div className="mt-4 flex flex-col gap-4">
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
          <Field label="New password" htmlFor="admin-new-password">
            <Input
              id="admin-new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Min 6 characters"
              required
            />
          </Field>
          <Field label="Confirm new password" htmlFor="admin-confirm-password">
            <Input
              id="admin-confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
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
          {busy ? "Saving..." : "Update Password"}
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
