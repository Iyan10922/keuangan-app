"use client";

import {
  ArrowDownCircle,
  BadgeDollarSign,
  BarChart3,
  Trophy,
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
  totalTransactions: number;
  averageExpensePerDay: number;
  topCategory:
    | {
        category: string;
        amount: number;
      }
    | null;
  biggestExpense:
    | {
        amount: number;
        category: string;
      }
    | null;
};

export default function InsightCards({
  totalTransactions,
  averageExpensePerDay,
  topCategory,
  biggestExpense,
}: Props) {
  const cards = [
    {
      title: "Total Transaksi",
      description: "Jumlah transaksi pada periode ini",
      value: totalTransactions.toLocaleString("id-ID"),
      icon: BarChart3,
      iconClassName: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Rata-rata / Hari",
      description: "Rata-rata pengeluaran harian",
      value: formatYen(averageExpensePerDay),
      icon: BadgeDollarSign,
      iconClassName: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "Kategori Terbesar",
      description: "Kategori dengan total terbesar",
      value: topCategory?.category ?? "-",
      icon: Trophy,
      iconClassName: "bg-amber-500/10 text-amber-600",
    },
    {
      title: "Pengeluaran Terbesar",
      description: biggestExpense
        ? biggestExpense.category
        : "Belum ada data",
      value: biggestExpense
        ? formatYen(biggestExpense.amount)
        : "-",
      icon: ArrowDownCircle,
      iconClassName: "bg-red-500/10 text-red-600",
      valueClassName: "text-red-600",
    },
  ];

  return (
    <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-1">
                <CardDescription>
                  {card.title}
                </CardDescription>

                <CardTitle
                  className={`text-2xl font-bold ${
                    card.valueClassName ?? ""
                  }`}
                >
                  {card.value}
                </CardTitle>
              </div>

              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${card.iconClassName}`}
              >
                <Icon className="size-5" />
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}