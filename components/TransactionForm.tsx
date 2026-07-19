"use client";

import type { FormEvent } from "react";
import { Loader2, Pencil, PlusCircle, WalletCards } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type TransactionType = "income" | "expense";

type TransactionFormProps = {
  type: TransactionType;
  amount: string;
  category: string;
  description: string;
  editingTransaction: boolean;
  isSubmitting: boolean;
  onTypeChange: (value: TransactionType) => void;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
};

const transactionTypeItems = [
  {
    label: "Pemasukan",
    value: "income",
  },
  {
    label: "Pengeluaran",
    value: "expense",
  },
];

export default function TransactionForm({
  type,
  amount,
  category,
  description,
  editingTransaction,
  isSubmitting,
  onTypeChange,
  onAmountChange,
  onCategoryChange,
  onDescriptionChange,
  onSubmit,
  onCancelEdit,
}: TransactionFormProps) {
  function handleTypeChange(value: string | null) {
    if (value === "income" || value === "expense") {
      onTypeChange(value);
    }
  }

  return (
    <Card className="h-fit">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {editingTransaction ? (
                <Pencil className="size-5" />
              ) : (
                <WalletCards className="size-5" />
              )}
            </div>

            <div className="space-y-1">
              <CardTitle>
                {editingTransaction
                  ? "Edit Transaksi"
                  : "Tambah Transaksi"}
              </CardTitle>

              <CardDescription>
                {editingTransaction
                  ? "Perbarui informasi transaksi yang dipilih."
                  : "Catat pemasukan atau pengeluaran baru."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="transaction-type">
              Jenis transaksi
            </Label>

            <Select
              items={transactionTypeItems}
              value={type}
              onValueChange={handleTypeChange}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="transaction-type"
                className="w-full"
                aria-label="Jenis transaksi"
              >
                <SelectValue placeholder="Pilih jenis transaksi" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {transactionTypeItems.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-amount">
              Nominal
            </Label>

            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                ¥
              </span>

              <Input
                id="transaction-amount"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={amount}
                disabled={isSubmitting}
                onChange={(event) =>
                  onAmountChange(event.target.value)
                }
                placeholder="Contoh: 5000"
                className="pl-8"
                required
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Masukkan nominal dalam Yen.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-category">
              Kategori
            </Label>

            <Input
              id="transaction-category"
              type="text"
              value={category}
              disabled={isSubmitting}
              onChange={(event) =>
                onCategoryChange(event.target.value)
              }
              placeholder="Contoh: Gaji, Makanan, atau Transportasi"
              maxLength={60}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-description">
              Keterangan
              <span className="ml-1 font-normal text-muted-foreground">
                (opsional)
              </span>
            </Label>

            <Textarea
              id="transaction-description"
              value={description}
              disabled={isSubmitting}
              onChange={(event) =>
                onDescriptionChange(event.target.value)
              }
              placeholder="Tambahkan catatan singkat mengenai transaksi..."
              rows={4}
              maxLength={250}
              className="resize-none"
            />

            <p className="text-right text-xs text-muted-foreground">
              {description.length}/250
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t sm:flex-row">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />

                {editingTransaction
                  ? "Memperbarui..."
                  : "Menyimpan..."}
              </>
            ) : editingTransaction ? (
              <>
                <Pencil />
                Perbarui Transaksi
              </>
            ) : (
              <>
                <PlusCircle />
                Simpan Transaksi
              </>
            )}
          </Button>

          {editingTransaction && (
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={onCancelEdit}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}