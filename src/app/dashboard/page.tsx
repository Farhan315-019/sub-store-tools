"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DashboardSection } from "@/components/dashboard/DashboardLayout";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OverviewPanel } from "@/components/dashboard/OverviewPanel";
import { ProductsPanel, NewOrderPanel } from "@/components/dashboard/ProductsPanel";
import { OrdersPanel } from "@/components/dashboard/OrdersPanel";
import { WalletPanel } from "@/components/dashboard/WalletPanel";
import { TransactionsPanel } from "@/components/dashboard/TransactionsPanel";
import { ChatPanel } from "@/components/dashboard/ChatPanel";
import { SupportPanel } from "@/components/dashboard/SupportPanel";
import { ProfilePanel } from "@/components/dashboard/ProfilePanel";

const resellerName = "Ahmad Raza";
const resellerStore = "Digital Bazaar";

export default function DashboardPage() {
  const router = useRouter();
  const [active, setActive] = useState<DashboardSection>("overview");

  const handleLogout = () => {
    router.push("/login");
  };

  const panels: Record<DashboardSection, React.ReactNode> = {
    overview: <OverviewPanel />,
    products: <ProductsPanel />,
    "new-order": <NewOrderPanel />,
    orders: <OrdersPanel />,
    wallet: <WalletPanel />,
    transactions: <TransactionsPanel />,
    chat: <ChatPanel />,
    support: <SupportPanel />,
    profile: <ProfilePanel />,
  };

  return (
    <div>
      <section className="border-b border-border bg-background-elevated">
        <div className="container-x flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                Reseller Dashboard
              </h1>
            </div>
            <p className="mt-1 text-sm text-muted">
              Welcome back, {resellerName} ({resellerStore}). Here&apos;s what&apos;s happening with
              your business.
            </p>
          </div>
        </div>
      </section>
      <DashboardLayout active={active} onNavigate={setActive} onLogout={handleLogout}>
        {panels[active]}
      </DashboardLayout>
    </div>
  );
}
