"use client";

import type { FormEvent } from "react";

type TransactionFormProps = {
  type: "income" | "expense";
  amount: string;
  category: string;
  description: string;
  onTypeChange: (value: "income" | "expense") => void;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function TransactionForm({
  type,
  amount,
  category,
  description,
  onTypeChange,
  onAmountChange,
  onCategoryChange,
  onDescriptionChange,
  onSubmit,
}: TransactionFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-6 shadow"
    >
      <h2 className="text-xl font-bold text-slate-800">
        Tambah Transaksi
      </h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Jenis transaksi
          </label>

          <select
            value={type}
            onChange={(event) =>
              onTypeChange(event.target.value as "income" | "expense")
            }
            className="mt-1 w-full rounded-xl border border-slate-300 p-3"
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Jumlah
          </label>

          <input
            type="number"
            min="1"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            placeholder="Contoh: 5000"
            className="mt-1 w-full rounded-xl border border-slate-300 p-3"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Kategori
          </label>

          <input
            type="text"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            placeholder="Contoh: Gaji atau Makanan"
            className="mt-1 w-full rounded-xl border border-slate-300 p-3"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Keterangan
          </label>

          <input
            type="text"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Keterangan tambahan"
            className="mt-1 w-full rounded-xl border border-slate-300 p-3"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Simpan Transaksi
      </button>
    </form>
  );
}