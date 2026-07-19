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

function getCurrentMonth() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export default function useDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth);

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const monthlyTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (!transaction.created_at) {
        return false;
      }

      const transactionDate = new Date(transaction.created_at);

      if (Number.isNaN(transactionDate.getTime())) {
        return false;
      }

      const transactionMonth = `${transactionDate.getFullYear()}-${String(
        transactionDate.getMonth() + 1
      ).padStart(2, "0")}`;

      return transactionMonth === selectedMonth;
    });
  }, [transactions, selectedMonth]);

  const totalIncome = useMemo(() => {
    return monthlyTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [monthlyTransactions]);

  const totalExpense = useMemo(() => {
    return monthlyTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [monthlyTransactions]);

  const balance = totalIncome - totalExpense;

  const filteredTransactions = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return monthlyTransactions;
    }

    return monthlyTransactions.filter((transaction) => {
      return (
        transaction.category.toLowerCase().includes(keyword) ||
        (transaction.description ?? "").toLowerCase().includes(keyword)
      );
    });
  }, [monthlyTransactions, search]);

  const expenseByCategory = useMemo(() => {
    const categoryMap = new Map<string, number>();

    monthlyTransactions
      .filter((transaction) => transaction.type === "expense")
      .forEach((transaction) => {
        categoryMap.set(
          transaction.category,
          (categoryMap.get(transaction.category) ?? 0) + transaction.amount
        );
      });

    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
    }));
  }, [monthlyTransactions]);

  const totalTransactions = monthlyTransactions.length;

  const averageExpensePerDay = useMemo(() => {
    const expenses = monthlyTransactions.filter(
      (transaction) => transaction.type === "expense"
    );

    if (expenses.length === 0) {
      return 0;
    }

    const expenseTotal = expenses.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    const uniqueDays = new Set(
      expenses
        .filter((transaction) => transaction.created_at)
        .map((transaction) =>
          new Date(transaction.created_at).toDateString()
        )
    );

    if (uniqueDays.size === 0) {
      return 0;
    }

    return Math.round(expenseTotal / uniqueDays.size);
  }, [monthlyTransactions]);

  const topCategory = useMemo(() => {
    if (expenseByCategory.length === 0) {
      return null;
    }

    return [...expenseByCategory].sort(
      (a, b) => b.amount - a.amount
    )[0];
  }, [expenseByCategory]);

  const biggestExpense = useMemo(() => {
    const expenses = monthlyTransactions.filter(
      (transaction) => transaction.type === "expense"
    );

    if (expenses.length === 0) {
      return null;
    }

    return [...expenses].sort(
      (a, b) => b.amount - a.amount
    )[0];
  }, [monthlyTransactions]);

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

    if (isSubmitting) {
      return;
    }

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
    if (deletingId) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteTransactionService(id);

      setTransactions((currentTransactions) =>
        currentTransactions.filter(
          (transaction) => transaction.id !== id
        )
      );

      if (editingTransaction?.id === id) {
        resetForm();
      }

      toast.success("Transaksi berhasil dihapus.");
    } catch (error: unknown) {
      console.error("Gagal menghapus transaksi:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Transaksi gagal dihapus."
      );
    } finally {
      setDeletingId(null);
    }
  }

  function editTransaction(transaction: Transaction) {
    if (isSubmitting || deletingId) {
      return;
    }

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
    if (isSubmitting) {
      return;
    }

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
    selectedMonth,

    editingTransaction,

    totalIncome,
    totalExpense,
    balance,
    expenseByCategory,
    totalTransactions,
    averageExpensePerDay,
    topCategory,
    biggestExpense,

    isLoading,
    isSubmitting,
    deletingId,

    setType,
    setAmount,
    setCategory,
    setDescription,
    setSearch,
    setSelectedMonth,

    handleSubmit,
    deleteTransaction,
    editTransaction,
    cancelEditing,
  };
}