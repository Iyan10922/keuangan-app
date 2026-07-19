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
      <CardContent className="p-5 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <WalletCards className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70">
                Finance Dashboard
              </p>

              <h1 className="mt-1 text-2xl font-bold md:text-3xl">
                Dashboard Keuangan
              </h1>

              <p className="mt-1 text-sm text-primary-foreground/80">
                Kelola keuangan dengan mudah.
              </p>
            </div>
          </div>

          <div className="hidden rounded-xl bg-white/10 px-4 py-3 backdrop-blur md:block">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/70">
              Hari Ini
            </p>

            <p className="mt-1 font-semibold">
              {today}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white/10 px-4 py-3 backdrop-blur md:hidden">
          <p className="text-xs uppercase tracking-widest text-primary-foreground/70">
            Hari Ini
          </p>

          <p className="mt-1 text-sm font-semibold">
            {today}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}