import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | Reseller Dashboard",
  description:
    "Login to your Sub Store Tools reseller account to manage orders, wallet and business growth.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Login to your reseller account to manage orders, wallet and support."
      footer={
        <>
          New to Sub Store Tools?{" "}
          <Link href="/signup" className="font-semibold text-accent-text hover:underline">
            Request a reseller account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
