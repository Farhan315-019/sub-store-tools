import { isAdminAuthed } from "@/lib/adminAuth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const metadata = {
  title: "Admin Panel | Sub Store Tools",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthed();

  if (!authed) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center py-10 sm:py-14">
        <div className="w-full max-w-md">
          <AdminLoginForm />
        </div>
      </div>
    );
  }

  return <AdminPanel />;
}
