"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
} from "lucide-react";

import { formatYen } from "@/lib/currency";

import { Card } from "@/components/ui/card";

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
    <Card className="mt-4 overflow-hidden border shadow-sm">
      <div className="grid grid-cols-3 divide-x">
        <div className="flex flex-col items-center justify-center px-3 py-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10">
            <Wallet className="h-4 w-4 text-blue-600" />
          </div>

          <p className="text-xs text-muted-foreground">
            Saldo
          </p>

          <p className="mt-1 text-lg font-bold">
            {formatYen(balance)}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center px-3 py-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10">
            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
          </div>

          <p className="text-xs text-muted-foreground">
            Masuk
          </p>

          <p className="mt-1 text-lg font-bold text-emerald-600">
            {formatYen(totalIncome)}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center px-3 py-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10">
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </div>

          <p className="text-xs text-muted-foreground">
            Keluar
          </p>

          <p className="mt-1 text-lg font-bold text-red-600">
            {formatYen(totalExpense)}
          </p>
        </div>
      </div>
    </Card>
  );
}