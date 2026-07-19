import SummaryCard from "@/components/SummaryCard";
import { formatYen } from "@/lib/currency";

type DashboardSummaryProps = {
  balance: number;
  totalIncome: number;
  totalExpense: number;
};

export default function DashboardSummary({
  balance,
  totalIncome,
  totalExpense,
}: DashboardSummaryProps) {
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-3">
      <SummaryCard
        title="Saldo"
        value={formatYen(balance)}
      />

      <SummaryCard
        title="Pemasukan"
        value={formatYen(totalIncome)}
        color="text-green-600"
      />

      <SummaryCard
        title="Pengeluaran"
        value={formatYen(totalExpense)}
        color="text-red-600"
      />
    </section>
  );
}