"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Field, Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ProfilePanel() {
  const [name, setName] = useState("Ahmad Raza");
  const [email, setEmail] = useState("ahmad@digitalbazaar.pk");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Profile</h1>
        <p className="mt-1 text-sm text-muted">Update your reseller account details.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl rounded-card-lg border border-border bg-surface p-6">
        <div className="flex flex-col gap-4">
          <Field label="Full Name" htmlFor="profile-name">
            <Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} />
          </Field>
          <Field label="Email" htmlFor="profile-email">
            <Input
              id="profile-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field>
          <Field label="Phone / WhatsApp" htmlFor="profile-phone">
            <Input
              id="profile-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </Field>
          <Label htmlFor="profile-password">Password</Label>
          <Input
            id="profile-password"
            type="password"
            placeholder="Change password (coming soon)"
            disabled
          />
          <Button type="submit" size="lg" className="mt-2">
            {saved ? "Saved" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
