"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  Wallet,
} from "lucide-react";

import { formatYen } from "@/lib/currency";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  const isPositiveBalance = balance >= 0;

  const summaryItems = [
    {
      title: "Saldo",
      value: formatYen(balance),
      description: isPositiveBalance
        ? "Kondisi keuangan saat ini."
        : "Pengeluaran lebih besar dari pemasukan.",
      icon: Wallet,
      iconClassName: isPositiveBalance
        ? "bg-blue-500/10 text-blue-600"
        : "bg-red-500/10 text-red-600",
      valueClassName: isPositiveBalance
        ? "text-foreground"
        : "text-red-600",
    },
    {
      title: "Pemasukan",
      value: formatYen(totalIncome),
      description: "Total pemasukan pada periode ini.",
      icon: ArrowUpRight,
      iconClassName: "bg-emerald-500/10 text-emerald-600",
      valueClassName: "text-emerald-600",
    },
    {
      title: "Pengeluaran",
      value: formatYen(totalExpense),
      description: "Total pengeluaran pada periode ini.",
      icon: ArrowDownRight,
      iconClassName: "bg-red-500/10 text-red-600",
      valueClassName: "text-red-600",
    },
  ];

  return (
    <section className="mt-8 grid gap-4 md:grid-cols-3">
      {summaryItems.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-1">
                <CardDescription>
                  {item.title}
                </CardDescription>

                <CardTitle
                  className={`text-2xl font-bold tracking-tight ${item.valueClassName}`}
                >
                  {item.value}
                </CardTitle>
              </div>

              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${item.iconClassName}`}
              >
                <Icon className="size-5" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CircleDollarSign className="size-4 shrink-0" />

                <span>{item.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}