"use client";

import { FormEvent, useEffect, useState } from "react";
import SummaryCard from "@/components/SummaryCard";
import Navbar from "@/components/Navbar";
import { formatYen } from "@/lib/currency";
import TransactionList from "@/components/TransactionList";
import TransactionForm from "@/components/TransactionForm";
import { toast } from "sonner";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TransactionSearch from "@/components/dashboard/TransactionSearch";
import {
  createTransaction,
  deleteTransaction as deleteTransactionService,
  getTransactions,
  updateTransaction,
} from "@/services/transactionService";
import type { Transaction } from "@/types/transaction";


export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editingTransaction, setEditingTransaction] =
  useState<Transaction | null>(null);

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = totalIncome - totalExpense;

  const filteredTransactions = transactions.filter((transaction) => {
    const keyword = search.toLowerCase().trim();
  
    return (
      transaction.category.toLowerCase().includes(keyword) ||
      (transaction.description ?? "").toLowerCase().includes(keyword)
    );
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const numericAmount = Number(amount);
  
    if (!amount || numericAmount <= 0 || !category.trim()) {
      alert("Nominal dan kategori harus diisi.");
      return;
    }
  
    const transactionData = {
      type,
      amount: numericAmount,
      category: category.trim(),
      description: description.trim(),
    };
  
    if (editingTransaction) {
      try {
        const data = await updateTransaction(
          editingTransaction.id,
          transactionData
        );
    
        setTransactions((current) =>
          current.map((transaction) =>
            transaction.id === editingTransaction.id
              ? data
              : transaction
          )
        );
    
        setEditingTransaction(null);
      } catch (error) {
        console.error("Gagal mengedit transaksi:", error);
        alert("Transaksi gagal diedit.");
        return;
      }
    } else {
      try {
        const data = await createTransaction(transactionData);
    
        setTransactions((current) => [
          data,
          ...current,
        ]);
        toast.success("Transaksi berhasil disimpan.");

      } catch (error: any) {
        console.error("ERROR SUPABASE:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Transaksi gagal disimpan."
        );
        return;
      }
    }
  
    setType("income");
    setAmount("");
    setCategory("");
    setDescription("");
  }

  async function deleteTransaction(id: string) {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus transaksi ini?"
    );
  
    if (!confirmDelete) return;
  
    try {
      await deleteTransactionService(id);
  
      setTransactions((current) =>
        current.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Gagal menghapus transaksi:", error);
      alert("Transaksi gagal dihapus.");
    }
  }

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Gagal memuat transaksi:", error);
      }
    }
  
    loadTransactions();
  }, []);


  function editTransaction(transaction: Transaction) {
    setEditingTransaction(transaction);
  
    setType(transaction.type);
    setAmount(String(transaction.amount));
    setCategory(transaction.category);
    setDescription(transaction.description);
  
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto max-w-5xl p-6">
        <h2 className="text-3xl font-bold text-slate-800">
          Dashboard Keuangan
        </h2>

        <p className="mt-2 text-slate-500">
          Catat pemasukan dan pengeluaranmu.
        </p>

       <TransactionSearch
  search={search}
  onSearchChange={setSearch}
/>
<DashboardSummary
  balance={balance}
  totalIncome={totalIncome}
  totalExpense={totalExpense}
/>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <TransactionForm
  type={type}
  amount={amount}
  category={category}
  description={description}
  onTypeChange={setType}
  onAmountChange={setAmount}
  onCategoryChange={setCategory}
  onDescriptionChange={setDescription}
  onSubmit={handleSubmit}
/>
          
<TransactionList
  transactions={filteredTransactions}
  onDelete={deleteTransaction}
  onEdit={editTransaction}
/>
        </section>
      </div>
    </main>
  );
}