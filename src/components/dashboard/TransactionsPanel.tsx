import { mockDashboard } from "@/data/mockDashboard";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function TransactionsPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Transactions</h1>
        <p className="mt-1 text-sm text-muted">Every credit and debit on your reseller account.</p>
      </div>

      <div className="overflow-hidden rounded-card-lg border border-border bg-surface">
        <ul className="divide-y divide-border md:hidden">
          {mockDashboard.transactions.map((transaction) => (
            <li key={transaction.id} className="px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-accent-text">{transaction.id}</p>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    transaction.type === "credit" ? "text-success" : "text-foreground"
                  )}
                >
                  {transaction.type === "credit" ? "+" : "-"}
                  {formatPrice(transaction.amount)}
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground">{transaction.description}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                    transaction.type === "credit"
                      ? "border-success/25 bg-success/10 text-success"
                      : "border-border bg-surface-2 text-muted"
                  )}
                >
                  {transaction.type}
                </span>
                <span className="text-xs text-muted-2">{transaction.date}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-xs uppercase tracking-wider text-muted-2">
                <th scope="col" className="px-5 py-3.5 font-medium">Transaction</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Description</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Date</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Type</th>
                <th scope="col" className="px-5 py-3.5 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockDashboard.transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-medium text-accent-text">{transaction.id}</td>
                  <td className="px-5 py-4 text-foreground">{transaction.description}</td>
                  <td className="px-5 py-4 text-muted">{transaction.date}</td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
                        transaction.type === "credit"
                          ? "border-success/25 bg-success/10 text-success"
                          : "border-border bg-surface-2 text-muted"
                      )}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td
                    className={cn(
                      "px-5 py-4 text-right font-semibold",
                      transaction.type === "credit" ? "text-success" : "text-foreground"
                    )}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatPrice(transaction.amount)}
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
