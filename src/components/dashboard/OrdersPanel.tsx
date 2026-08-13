import { mockDashboard } from "@/data/mockDashboard";
import { formatPrice } from "@/lib/utils";
import { OrderStatusBadge } from "./OrderStatusBadge";

export function OrdersPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">My Orders</h1>
        <p className="mt-1 text-sm text-muted">Track every order placed through your reseller account.</p>
      </div>

      <div className="overflow-hidden rounded-card-lg border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-xs uppercase tracking-wider text-muted-2">
                <th scope="col" className="px-5 py-3.5 font-medium">Order</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Product</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Plan</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Date</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Amount</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockDashboard.orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-medium text-accent-text">{order.id}</td>
                  <td className="px-5 py-4 text-foreground">{order.product}</td>
                  <td className="px-5 py-4 text-muted">{order.plan}</td>
                  <td className="px-5 py-4 text-muted">{order.date}</td>
                  <td className="px-5 py-4 text-foreground">{formatPrice(order.amount)}</td>
                  <td className="px-5 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
