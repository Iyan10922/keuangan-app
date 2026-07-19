"use client";

import { CalendarDays } from "lucide-react";

import { Input } from "@/components/ui/input";

type MonthFilterProps = {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
};

export default function MonthFilter({
  selectedMonth,
  onMonthChange,
}: MonthFilterProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="month-filter"
        className="text-sm font-medium"
      >
        Periode
      </label>

      <div className="relative">
        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          id="month-filter"
          type="month"
          value={selectedMonth}
          onChange={(event) =>
            onMonthChange(event.target.value)
          }
          className="h-11 pl-10"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Pilih bulan untuk menampilkan data dashboard.
      </p>
    </div>
  );
}