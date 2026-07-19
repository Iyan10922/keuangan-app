"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
} from "lucide-react";

import { formatYen } from "@/lib/currency";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
  const items = [
    {
      title: "Saldo",
      value: formatYen(balance),
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      title: "Pemasukan",
      value: formatYen(totalIncome),
      icon: ArrowUpRight,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Pengeluaran",
      value: formatYen(totalExpense),
      icon: ArrowDownRight,
      color: "text-red-600",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <section className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="border shadow-sm transition hover:shadow-md"
          >
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {item.title}
                </span>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.bg}`}
                >
                  <Icon
                    className={`h-4 w-4 ${item.color}`}
                  />
                </div>
              </div>

              <p
                className={`truncate text-xl font-bold ${item.color}`}
              >
                {item.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}