import type { ComponentType, SVGProps } from "react";
import {
  ArrowLeftRight,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  MessagesSquare,
  Package,
  PlusCircle,
  ShoppingBag,
  User,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DashboardSection =
  | "overview"
  | "products"
  | "new-order"
  | "orders"
  | "wallet"
  | "transactions"
  | "chat"
  | "support"
  | "profile";

type IconComponent = ComponentType<Omit<LucideProps, "ref"> & SVGProps<SVGSVGElement>>;

export const dashboardSections: Array<{
  id: DashboardSection;
  label: string;
  icon: IconComponent;
}> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "new-order", label: "New Order", icon: PlusCircle },
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "wallet", label: "Wallet", icon: CreditCard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "chat", label: "Chat", icon: MessagesSquare },
  { id: "support", label: "Support", icon: LifeBuoy },
  { id: "profile", label: "Profile", icon: User },
];

type DashboardLayoutProps = {
  active: DashboardSection;
  onNavigate: (section: DashboardSection) => void;
  onLogout: () => void;
  children: React.ReactNode;
};

export function DashboardLayout({ active, onNavigate, onLogout, children }: DashboardLayoutProps) {
  return (
    <div className="container-x py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[15.5rem_1fr]">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <nav aria-label="Dashboard navigation" className="rounded-card-lg border border-border bg-surface p-3">
            <ul className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible lg:pb-0">
              {dashboardSections.map((section) => {
                const isActive = section.id === active;
                return (
                  <li key={section.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => onNavigate(section.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-accent-soft text-accent-text"
                          : "text-muted hover:bg-surface-2 hover:text-foreground"
                      )}
                    >
                      <section.icon className="size-4 shrink-0" aria-hidden="true" />
                      <span className="whitespace-nowrap">{section.label}</span>
                    </button>
                  </li>
                );
              })}
              <li className="shrink-0 border-t border-border pt-1.5 lg:mt-1.5">
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-danger"
                >
                  <LogOut className="size-4 shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
