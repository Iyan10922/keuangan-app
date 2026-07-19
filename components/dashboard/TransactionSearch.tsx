"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TransactionSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function TransactionSearch({
  search,
  onSearchChange,
}: TransactionSearchProps) {
  const hasSearch = search.trim().length > 0;

  return (
    <div className="space-y-2">
      <label
        htmlFor="transaction-search"
        className="text-sm font-medium"
      >
        Cari Transaksi
      </label>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          id="transaction-search"
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Cari kategori atau keterangan..."
          className="h-11 pl-10 pr-12"
        />

        {hasSearch && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => onSearchChange("")}
            className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
            aria-label="Hapus pencarian"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Cari berdasarkan kategori atau keterangan transaksi.
      </p>
    </div>
  );
}