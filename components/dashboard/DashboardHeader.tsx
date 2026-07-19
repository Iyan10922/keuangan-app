"use client";

import { WalletCards } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function DashboardHeader() {
  const today = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg">
      <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <WalletCards className="size-7" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-primary-foreground/80">
              Finance Dashboard
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Dashboard Keuangan
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-primary-foreground/80 md:text-base">
              Pantau saldo, pemasukan, dan pengeluaran dalam satu tempat.
              Catat setiap transaksi agar kondisi keuanganmu selalu
              terkontrol.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur md:text-right">
          <p className="text-xs uppercase tracking-wider text-primary-foreground/70">
            Hari Ini
          </p>

          <p className="mt-2 text-lg font-semibold">
            {today}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}