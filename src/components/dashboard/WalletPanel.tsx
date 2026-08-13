import { ArrowRightLeft, ArrowUpRight, CreditCard } from "lucide-react";
import { mockDashboard } from "@/data/mockDashboard";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";
import { StatCard } from "./StatCard";

const waTopUpLink = `https://wa.me/${siteConfig.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
  `Hello ${siteConfig.name}, I would like to top up my reseller wallet. Please share the payment details.`
)}`;

export function WalletPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Wallet</h1>
        <p className="mt-1 text-sm text-muted">Your reseller balance and recent wallet activity.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="relative overflow-hidden rounded-card-lg border border-accent/25 bg-background-elevated p-6">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
          <p className="text-xs font-medium uppercase tracking-wider text-muted-2">Available Balance</p>
          <p className="mt-3 font-display text-4xl font-extrabold text-foreground">
            {formatPrice(mockDashboard.walletBalance)}
          </p>
          <a
            href={waTopUpLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-strong"
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
            Top Up Balance
          </a>
          <p className="mt-3 text-xs text-muted-2">
            Top-ups are processed by our team — send your payment screenshot on WhatsApp.
          </p>
        </div>

        <StatCard
          label="Total Spent"
          value={formatPrice(mockDashboard.totalSpent) ?? "Rs. 0"}
          icon={CreditCard}
          hint={`Across ${mockDashboard.totalOrders} orders`}
        />
      </div>

      <div className="rounded-card-lg border border-border bg-surface p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-foreground">Recent Activity</h2>
          <ArrowRightLeft className="size-4 text-muted-2" aria-hidden="true" />
        </div>
        <ul className="mt-4 divide-y divide-border">
          {mockDashboard.transactions.slice(0, 4).map((transaction) => (
            <li key={transaction.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                <p className="mt-0.5 text-xs text-muted-2">{transaction.date}</p>
              </div>
              <span
                className={
                  transaction.type === "credit"
                    ? "text-sm font-semibold text-success"
                    : "text-sm font-semibold text-foreground"
                }
              >
                {transaction.type === "credit" ? "+" : "-"}
                {formatPrice(transaction.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
