import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account | Become a Reseller",
  description:
    "Create your Sub Store Tools reseller account and start growing your digital business with wholesale rates and fast fulfillment.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Become a Reseller"
      subtitle="Create your account to access reseller rates, order management and dedicated support."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-accent-text hover:underline">
            Login here
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
