"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatYen } from "@/lib/currency";

type FinanceChartProps = {
  totalIncome: number;
  totalExpense: number;
};

export default function FinanceChart({
  totalIncome,
  totalExpense,
}: FinanceChartProps) {
  const chartData = [
    {
      name: "Pemasukan",
      amount: totalIncome,
    },
    {
      name: "Pengeluaran",
      amount: totalExpense,
    },
  ];

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Ringkasan Bulanan
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Perbandingan pemasukan dan pengeluaran.
      </p>

      {totalIncome === 0 && totalExpense === 0 ? (
        <div className="flex h-72 items-center justify-center text-sm text-slate-500">
          Belum ada data transaksi pada bulan ini.
        </div>
      ) : (
        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) =>
                  new Intl.NumberFormat("ja-JP", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />

              <Tooltip
                formatter={(value) => [
                  formatYen(Number(value)),
                  "Nominal",
                ]}
                cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
              />

              <Bar
                dataKey="amount"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}