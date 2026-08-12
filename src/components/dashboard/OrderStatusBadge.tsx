import { cn } from "@/lib/utils";

const statusStyles = {
  completed: "bg-success/10 text-success border-success/25",
  pending: "bg-warning/10 text-warning border-warning/25",
  processing: "bg-info/10 text-info border-info/25",
};

export function OrderStatusBadge({ status }: { status: "completed" | "pending" | "processing" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}
