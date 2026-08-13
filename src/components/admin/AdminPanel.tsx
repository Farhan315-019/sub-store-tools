"use client";

import {
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  Settings,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { OverviewPanel } from "./OverviewPanel";
import { ProductsPanel } from "./ProductsPanel";
import { SellersPanel } from "./SellersPanel";
import { OrdersPanel } from "./OrdersPanel";
import { MessagesPanel } from "./MessagesPanel";
import { SettingsPanel } from "./SettingsPanel";
import { adminPost } from "./useAdminFetch";

type TabId = "overview" | "products" | "sellers" | "orders" | "messages" | "settings";

const tabs: Array<{ id: TabId; label: string; icon: LucideIcon }> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "sellers", label: "Sellers", icon: Users },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AdminPanel() {
  const router = useRouter();
  const [active, setActive] = useState<TabId>("overview");

  const handleLogout = async () => {
    await adminPost("/api/admin/logout");
    router.refresh();
  };

  const panels: Record<TabId, React.ReactNode> = {
    overview: <OverviewPanel />,
    products: <ProductsPanel />,
    sellers: <SellersPanel />,
    orders: <OrdersPanel />,
    messages: <MessagesPanel />,
    settings: <SettingsPanel onLogout={handleLogout} />,
  };

  return (
    <div className="container-x py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[15.5rem_1fr]">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <nav
            aria-label="Admin navigation"
            className="rounded-card-lg border border-border bg-surface p-3"
          >
            <div className="border-b border-border px-3.5 pb-3">
              <p className="font-display text-sm font-bold text-foreground">Admin Panel</p>
              <p className="text-xs text-muted-2">Manage your store</p>
            </div>
            <ul className="mt-1.5 flex gap-1.5 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible lg:pb-0">
              {tabs.map((tab) => {
                const isActive = tab.id === active;
                return (
                  <li key={tab.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActive(tab.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-accent-soft text-accent-text"
                          : "text-muted hover:bg-surface-2 hover:text-foreground"
                      )}
                    >
                      <tab.icon className="size-4 shrink-0" aria-hidden="true" />
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </button>
                  </li>
                );
              })}
              <li className="shrink-0 border-t border-border pt-1.5 lg:mt-1.5">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-danger"
                >
                  <LogOut className="size-4 shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="min-w-0">{panels[active]}</div>
      </div>
    </div>
  );
}
