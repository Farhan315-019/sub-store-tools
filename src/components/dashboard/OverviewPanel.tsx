import { CheckCircle2, Clock3, CreditCard, ShoppingBag, Zap } from "lucide-react";
import { mockDashboard } from "@/data/mockDashboard";
import { getPopularProducts } from "@/data/products";
import { StatCard } from "./StatCard";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { ProductCard } from "@/components/products/ProductCard";
import { QuickOrder } from "./QuickOrder";

export function OverviewPanel() {
  const popular = getPopularProducts(4);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Wallet Balance"
          value={`$${mockDashboard.walletBalance.toFixed(2)}`}
          icon={CreditCard}
          hint="Available for orders"
        />
        <StatCard
          label="Total Orders"
          value={String(mockDashboard.totalOrders)}
          icon={ShoppingBag}
        />
        <StatCard
          label="Pending Orders"
          value={String(mockDashboard.pendingOrders)}
          icon={Clock3}
        />
        <StatCard
          label="Completed Orders"
          value={String(mockDashboard.completedOrders)}
          icon={CheckCircle2}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-card-lg border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-foreground">Recent Orders</h2>
            <span className="text-xs text-muted-2">Sample data</span>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-2">
                  <th scope="col" className="pb-3 pr-4 font-medium">Order</th>
                  <th scope="col" className="pb-3 pr-4 font-medium">Product</th>
                  <th scope="col" className="pb-3 pr-4 font-medium">Plan</th>
                  <th scope="col" className="pb-3 pr-4 font-medium">Date</th>
                  <th scope="col" className="pb-3 pr-4 font-medium">Amount</th>
                  <th scope="col" className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockDashboard.orders.slice(0, 4).map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4 font-medium text-accent-text">{order.id}</td>
                    <td className="py-3 pr-4 text-foreground">{order.product}</td>
                    <td className="py-3 pr-4 text-muted">{order.plan}</td>
                    <td className="py-3 pr-4 text-muted">{order.date}</td>
                    <td className="py-3 pr-4 text-foreground">${order.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <OrderStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <QuickOrder />
      </div>

      <div>
        <h2 className="mb-4 font-display text-base font-bold text-foreground">Popular Reseller Products</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-2">
        <Zap className="size-3.5 text-accent-text" aria-hidden="true" />
        Dashboard data is mock/demo data and will be replaced by backend data.
      </p>
    </div>
  );
}
