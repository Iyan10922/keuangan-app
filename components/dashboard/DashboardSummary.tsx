"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
} from "lucide-react";

import { formatYen } from "@/lib/currency";
import { Card, CardContent } from "@/components/ui/card";

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
  const summaryItems = [
    {
      title: "Saldo",
      value: formatYen(balance),
      icon: Wallet,
      iconClassName: "bg-blue-500/10 text-blue-500",
      valueClassName: "text-foreground",
    },
    {
      title: "Masuk",
      value: formatYen(totalIncome),
      icon: ArrowUpRight,
      iconClassName: "bg-emerald-500/10 text-emerald-500",
      valueClassName: "text-emerald-500",
    },
    {
      title: "Keluar",
      value: formatYen(totalExpense),
      icon: ArrowDownRight,
      iconClassName: "bg-red-500/10 text-red-500",
      valueClassName: "text-red-500",
    },
  ];

  return (
    <Card className="mt-3 overflow-hidden shadow-sm">
      <CardContent className="grid grid-cols-3 p-0">
        {summaryItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`min-w-0 px-2 py-3 text-center sm:px-4 ${
                index > 0 ? "border-l" : ""
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${item.iconClassName}`}
                >
                  <Icon className="size-3.5" />
                </div>

                <span className="truncate text-[11px] font-medium text-muted-foreground sm:text-xs">
                  {item.title}
                </span>
              </div>

              <p
                className={`mt-1.5 truncate text-base font-bold tracking-tight sm:text-lg ${item.valueClassName}`}
                title={item.value}
              >
                {item.value}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}