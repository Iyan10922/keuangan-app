"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  ChartPie,
  CircleDollarSign,
} from "lucide-react";

import { formatYen } from "@/lib/currency";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  data: {
    category: string;
    amount: number;
  }[];
};

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#a855f7",
  "#ec4899",
  "#06b6d4",
  "#eab308",
  "#ef4444",
];

type PieTooltipProps = {
  active?: boolean;
  payload?: {
    payload: {
      category: string;
      amount: number;
    };
  }[];
};

function PieTooltip({
  active,
  payload,
}: PieTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0].payload;

  return (
    <div className="rounded-xl border bg-background px-4 py-3 shadow-lg">
      <p className="text-sm font-medium">
        {item.category}
      </p>

      <p className="mt-1 font-bold">
        {formatYen(item.amount)}
      </p>
    </div>
  );
}

export default function ExpensePieChart({
  data = [],
}: Props) {
  const totalExpense = data.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  return (
    <Card className="mt-8 overflow-hidden">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ChartPie className="size-5" />
          </div>

          <div className="space-y-1">
            <CardTitle>
              Pengeluaran per Kategori
            </CardTitle>

            <CardDescription>
              Distribusi pengeluaran berdasarkan kategori.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <ChartPie className="size-6 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">
              Belum ada data
            </h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Tambahkan transaksi pengeluaran agar grafik
              kategori dapat ditampilkan.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-muted/40 p-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CircleDollarSign className="size-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total Pengeluaran
                </p>

                <p className="text-xl font-bold">
                  {formatYen(totalExpense)}
                </p>
              </div>
            </div>

            <div className="h-96 w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={3}
                    stroke="transparent"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={entry.category}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    content={<PieTooltip />}
                  />

                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-2">
              {data.map((item, index) => {
                const percentage =
                  totalExpense === 0
                    ? 0
                    : (item.amount / totalExpense) * 100;

                return (
                  <div
                    key={item.category}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="size-3 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[
                              index %
                                COLORS.length
                            ],
                        }}
                      />

                      <span className="font-medium">
                        {item.category}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        {formatYen(item.amount)}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}