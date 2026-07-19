"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, TrendingDown, TrendingUp } from "lucide-react";

import { formatYen } from "@/lib/currency";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FinanceChartProps = {
  totalIncome: number;
  totalExpense: number;
};

type TooltipPayloadItem = {
  value?: number | string;
  payload?: {
    name?: string;
    amount?: number;
  };
};

type FinanceTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
};

const chartColors = {
  income: "#10b981",
  expense: "#ef4444",
};

function FinanceTooltip({
  active,
  payload,
}: FinanceTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];
  const name = item.payload?.name ?? "Nominal";
  const amount = Number(
    item.payload?.amount ?? item.value ?? 0,
  );

  return (
    <div className="rounded-xl border bg-background px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-foreground">
        {name}
      </p>

      <p className="mt-1 text-base font-bold">
        {formatYen(amount)}
      </p>
    </div>
  );
}

export default function FinanceChart({
  totalIncome,
  totalExpense,
}: FinanceChartProps) {
  const hasData = totalIncome > 0 || totalExpense > 0;

  const chartData = [
    {
      name: "Pemasukan",
      amount: totalIncome,
      color: chartColors.income,
    },
    {
      name: "Pengeluaran",
      amount: totalExpense,
      color: chartColors.expense,
    },
  ];

  const difference = totalIncome - totalExpense;
  const isSurplus = difference >= 0;

  return (
    <Card className="mt-8 overflow-hidden">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="size-5" />
            </div>

            <div className="space-y-1">
              <CardTitle>Ringkasan Bulanan</CardTitle>

              <CardDescription>
                Perbandingan total pemasukan dan pengeluaran
                pada periode yang dipilih.
              </CardDescription>
            </div>
          </div>

          {hasData && (
            <div
              className={
                isSurplus
                  ? "flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-emerald-700"
                  : "flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-2 text-red-700"
              }
            >
              {isSurplus ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}

              <div>
                <p className="text-xs font-medium">
                  {isSurplus ? "Surplus" : "Defisit"}
                </p>

                <p className="text-sm font-bold">
                  {formatYen(Math.abs(difference))}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {!hasData ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <BarChart3 className="size-6 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">
              Belum ada data grafik
            </h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Tambahkan transaksi pemasukan atau pengeluaran
              untuk melihat perbandingan keuangan bulan ini.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span
                  className="size-3 rounded-full"
                  style={{
                    backgroundColor: chartColors.income,
                  }}
                />

                <span className="text-muted-foreground">
                  Pemasukan
                </span>

                <span className="font-semibold">
                  {formatYen(totalIncome)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span
                  className="size-3 rounded-full"
                  style={{
                    backgroundColor: chartColors.expense,
                  }}
                />

                <span className="text-muted-foreground">
                  Pengeluaran
                </span>

                <span className="font-semibold">
                  {formatYen(totalExpense)}
                </span>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -10,
                    bottom: 0,
                  }}
                  barCategoryGap="30%"
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    className="stroke-muted"
                  />

                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: "currentColor",
                      fontSize: 12,
                    }}
                    className="text-muted-foreground"
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={70}
                    tick={{
                      fill: "currentColor",
                      fontSize: 12,
                    }}
                    className="text-muted-foreground"
                    tickFormatter={(value: number) =>
                      new Intl.NumberFormat("ja-JP", {
                        notation: "compact",
                        maximumFractionDigits: 1,
                      }).format(value)
                    }
                  />

                  <Tooltip
                    content={<FinanceTooltip />}
                    cursor={{
                      fill: "hsl(var(--muted))",
                      opacity: 0.5,
                    }}
                  />

                  <Bar
                    dataKey="amount"
                    radius={[10, 10, 4, 4]}
                    maxBarSize={110}
                  >
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}