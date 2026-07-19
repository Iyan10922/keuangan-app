"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  createTransaction,
  deleteTransaction as deleteTransactionService,
  getTransactions,
  updateTransaction,
} from "@/services/transactionService";
import type { Transaction } from "@/types/transaction";

export default function useDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalIncome = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [transactions]);

  const balance = totalIncome - totalExpense;

  const filteredTransactions = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return transactions;
    }

    return transactions.filter((transaction) => {
      return (
        transaction.category.toLowerCase().includes(keyword) ||
        (transaction.description ?? "").toLowerCase().includes(keyword)
      );
    });
  }, [transactions, search]);

  useEffect(() => {
    async function loadTransactions() {
      try {
        setIsLoading(true);

        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Gagal memuat transaksi:", error);
        toast.error("Transaksi gagal dimuat.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTransactions();
  }, []);

  function resetForm() {
    setType("income");
    setAmount("");
    setCategory("");
    setDescription("");
    setEditingTransaction(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!amount || numericAmount <= 0 || !category.trim()) {
      toast.error("Nominal dan kategori harus diisi.");
      return;
    }

    const transactionData = {
      type,
      amount: numericAmount,
      category: category.trim(),
      description: description.trim(),
    };

    try {
      setIsSubmitting(true);

      if (editingTransaction) {
        const updatedTransaction = await updateTransaction(
          editingTransaction.id,
          transactionData
        );

        setTransactions((currentTransactions) =>
          currentTransactions.map((transaction) =>
            transaction.id === editingTransaction.id
              ? updatedTransaction
              : transaction
          )
        );

        toast.success("Transaksi berhasil diperbarui.");
      } else {
        const newTransaction = await createTransaction(transactionData);

        setTransactions((currentTransactions) => [
          newTransaction,
          ...currentTransactions,
        ]);

        toast.success("Transaksi berhasil disimpan.");
      }

      resetForm();
    } catch (error: unknown) {
      console.error("Gagal menyimpan transaksi:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Transaksi gagal disimpan."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteTransaction(id: string) {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus transaksi ini?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteTransactionService(id);

      setTransactions((currentTransactions) =>
        currentTransactions.filter((transaction) => transaction.id !== id)
      );

      if (editingTransaction?.id === id) {
        resetForm();
      }

      toast.success("Transaksi berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus transaksi:", error);
      toast.error("Transaksi gagal dihapus.");
    }
  }

  function editTransaction(transaction: Transaction) {
    setEditingTransaction(transaction);
    setType(transaction.type);
    setAmount(String(transaction.amount));
    setCategory(transaction.category);
    setDescription(transaction.description ?? "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEditing() {
    resetForm();
  }

  return {
    transactions,
    filteredTransactions,
    type,
    amount,
    category,
    description,
    search,
    editingTransaction,
    totalIncome,
    totalExpense,
    balance,
    isLoading,
    isSubmitting,
    setType,
    setAmount,
    setCategory,
    setDescription,
    setSearch,
    handleSubmit,
    deleteTransaction,
    editTransaction,
    cancelEditing,
  };
}