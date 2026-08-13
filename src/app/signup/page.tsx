import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RequestAccountForm } from "@/components/auth/RequestAccountForm";

export const metadata: Metadata = {
  title: "Request Reseller Account | Become a Reseller",
  description:
    "Request your Sub Store Tools reseller account. Our admin team creates your account and shares your login details — no self-signup required.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Request Reseller Access"
      subtitle="Reseller accounts are created by our team on request. Send us your details and we will set up your account and share your login credentials."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-accent-text hover:underline">
            Login here
          </Link>
        </>
      }
    >
      <RequestAccountForm />
    </AuthShell>
  );
}
