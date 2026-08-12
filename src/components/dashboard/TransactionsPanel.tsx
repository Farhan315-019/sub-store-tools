import { mockDashboard } from "@/data/mockDashboard";
import { cn } from "@/lib/utils";

export function TransactionsPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Transactions</h1>
        <p className="mt-1 text-sm text-muted">Every credit and debit on your reseller account.</p>
      </div>

      <div className="overflow-hidden rounded-card-lg border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
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
                    {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-2">Transactions shown are sample data and will be replaced by live data.</p>
    </div>
  );
}
