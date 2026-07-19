"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  FileText,
  Loader2,
  Pencil,
  ReceiptText,
  Trash2,
} from "lucide-react";

import type { Transaction } from "@/types/transaction";
import { formatYen } from "@/lib/currency";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type TransactionListProps = {
  transactions: Transaction[];
  onDelete: (id: string) => void | Promise<void>;
  onEdit: (transaction: Transaction) => void;
  deletingId: string | null;
};

function formatTransactionDate(dateValue?: string | null) {
  if (!dateValue) {
    return "Tanggal tidak tersedia";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Tanggal tidak tersedia";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function TransactionList({
  transactions,
  onDelete,
  onEdit,
  deletingId,
}: TransactionListProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ReceiptText className="size-5" />
          </div>

          <div className="space-y-1">
            <CardTitle>Riwayat Transaksi</CardTitle>

            <CardDescription>
              {transactions.length > 0
                ? `${transactions.length} transaksi pada periode ini.`
                : "Daftar transaksi pada periode yang dipilih."}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {transactions.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <FileText className="size-6 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">
              Belum ada transaksi
            </h3>

            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Tambahkan transaksi baru atau pilih bulan lain untuk melihat
              riwayat transaksi.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => {
              const isDeleting = deletingId === transaction.id;
              const isIncome = transaction.type === "income";

              return (
                <article
                  key={transaction.id}
                  className="group rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <div
                        className={
                          isIncome
                            ? "flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"
                            : "flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600"
                        }
                      >
                        {isIncome ? (
                          <ArrowUpRight className="size-5" />
                        ) : (
                          <ArrowDownRight className="size-5" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate font-semibold">
                            {transaction.category}
                          </h3>

                          <Badge
                            variant="outline"
                            className={
                              isIncome
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-red-200 bg-red-50 text-red-700"
                            }
                          >
                            {isIncome ? "Pemasukan" : "Pengeluaran"}
                          </Badge>
                        </div>

                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {transaction.description || "Tanpa keterangan"}
                        </p>
                      </div>
                    </div>

                    <p
                      className={
                        isIncome
                          ? "shrink-0 font-bold text-emerald-600"
                          : "shrink-0 font-bold text-red-600"
                      }
                    >
                      {isIncome ? "+" : "-"}
                      {formatYen(transaction.amount)}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="size-4" />

                      <span>
                        {formatTransactionDate(transaction.created_at)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={isDeleting}
                        onClick={() => onEdit(transaction)}
                        aria-label={`Edit transaksi ${transaction.category}`}
                        title="Edit transaksi"
                      >
                        <Pencil className="size-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger
                          disabled={isDeleting}
                          render={
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              disabled={isDeleting}
                              aria-label={`Hapus transaksi ${transaction.category}`}
                              title="Hapus transaksi"
                            />
                          }
                        >
                          {isDeleting ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Hapus transaksi?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              Transaksi kategori{" "}
                              <span className="font-medium text-foreground">
                                {transaction.category}
                              </span>{" "}
                              sebesar{" "}
                              <span className="font-medium text-foreground">
                                {formatYen(transaction.amount)}
                              </span>{" "}
                              akan dihapus secara permanen. Tindakan ini tidak
                              dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting}>
                              Batal
                            </AlertDialogCancel>

                            <AlertDialogAction
                              type="button"
                              disabled={isDeleting}
                              onClick={() => onDelete(transaction.id)}
                              className="bg-destructive text-white hover:bg-destructive/90"
                            >
                              {isDeleting ? (
                                <>
                                  <Loader2 className="animate-spin" />
                                  Menghapus...
                                </>
                              ) : (
                                <>
                                  <Trash2 />
                                  Hapus transaksi
                                </>
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}