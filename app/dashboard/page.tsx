"use client";

import Navbar from "@/components/Navbar";
import TransactionList from "@/components/TransactionList";
import TransactionForm from "@/components/TransactionForm";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TransactionSearch from "@/components/dashboard/TransactionSearch";
import useDashboard from "@/hooks/useDashboard";
import MonthFilter from "@/components/dashboard/MonthFilter";

export default function DashboardPage() {
  const {
    filteredTransactions,
    selectedMonth,
    type,
    amount,
    category,
    description,
    search,
    balance,
    totalIncome,
    totalExpense,
    isLoading,
    isSubmitting,
    setSelectedMonth,
    setType,
    setAmount,
    setCategory,
    setDescription,
    setSearch,
    handleSubmit,
    deleteTransaction,
    editTransaction,
  } = useDashboard();

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto max-w-5xl p-6">
        <DashboardHeader />

        <MonthFilter
  selectedMonth={selectedMonth}
  onMonthChange={setSelectedMonth}
/>

        

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

          {isLoading ? (
            <div className="rounded-xl bg-white p-6 text-slate-500 shadow-sm">
              Memuat transaksi...
            </div>
          ) : (
            <TransactionList
              transactions={filteredTransactions}
              onDelete={deleteTransaction}
              onEdit={editTransaction}
            />
          )}
        </section>

        {isSubmitting && (
          <p className="mt-4 text-sm text-slate-500">
            Menyimpan transaksi...
          </p>
        )}
      </div>
    </main>
  );
}