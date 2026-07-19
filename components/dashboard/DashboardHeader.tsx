"use client";

import { CalendarDays, WalletCards } from "lucide-react";

export default function DashboardHeader() {
const today = new Intl.DateTimeFormat("id-ID", {
weekday: "long",
day: "numeric",
month: "long",
year: "numeric",
}).format(new Date());

return (
<section className="flex items-center gap-3 px-1 py-2 md:py-3">
<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
<WalletCards className="size-5" />
</div>

<div className="min-w-0">
<h1 className="truncate text-xl font-bold tracking-tight md:text-2xl">
Dashboard Keuangan
</h1>

<div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground md:text-sm">
<CalendarDays className="size-3.5 shrink-0" />
<span className="truncate">{today}</span>
</div>
</div>
</section>
);
}
