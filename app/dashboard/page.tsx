"use client";

import Navbar from "@/components/Navbar";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import FinanceChart from "@/components/dashboard/FinanceChart";
import InsightCards from "@/components/dashboard/InsightCards";
import MonthFilter from "@/components/dashboard/MonthFilter";
import TransactionSearch from "@/components/dashboard/TransactionSearch";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import useDashboard from "@/hooks/useDashboard";

function TransactionListSkeleton() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Skeleton className="size-10 rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56 max-w-full" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <Skeleton className="size-10 shrink-0 rounded-xl" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-full max-w-56" />
                </div>
              </div>

              <Skeleton className="h-5 w-20 shrink-0" />
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <Skeleton className="h-4 w-28" />

              <div className="flex gap-2">
                <Skeleton className="size-9 rounded-md" />
                <Skeleton className="size-9 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

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
    expenseByCategory,

    totalTransactions,
    averageExpensePerDay,
    topCategory,
    biggestExpense,

    editingTransaction,

    isLoading,
    isSubmitting,
    deletingId,

    setSelectedMonth,
    setType,
    setAmount,
    setCategory,
    setDescription,
    setSearch,

    handleSubmit,
    deleteTransaction,
    editTransaction,
    cancelEditing,
  } = useDashboard();

  return (
    <main className="min-h-screen bg-muted/30">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHeader />

        <section className="mt-6 rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(220px,0.7fr)_minmax(300px,1.3fr)] lg:items-end">
            <MonthFilter
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
            />

            <TransactionSearch
              search={search}
              onSearchChange={setSearch}
            />
          </div>
        </section>

        <div className="[&>section]:mt-6">
          <DashboardSummary
            balance={balance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />
        </div>

        <div className="[&>section]:mt-6">
          <InsightCards
            totalTransactions={totalTransactions}
            averageExpensePerDay={averageExpensePerDay}
            topCategory={topCategory}
            biggestExpense={biggestExpense}
          />
        </div>

        <section className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)]">
          <div className="min-w-0 [&>*]:mt-0">
            <FinanceChart
              totalIncome={totalIncome}
              totalExpense={totalExpense}
            />
          </div>

          <div className="min-w-0 [&>*]:mt-0">
            <ExpensePieChart data={expenseByCategory} />
          </div>
        </section>

        <section className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(340px,0.8fr)_minmax(0,1.2fr)]">
          <div className="xl:sticky xl:top-6">
            <TransactionForm
              type={type}
              amount={amount}
              category={category}
              description={description}
              editingTransaction={editingTransaction !== null}
              isSubmitting={isSubmitting}
              onTypeChange={setType}
              onAmountChange={setAmount}
              onCategoryChange={setCategory}
              onDescriptionChange={setDescription}
              onSubmit={handleSubmit}
              onCancelEdit={cancelEditing}
            />
          </div>

          <div className="min-w-0">
            {isLoading ? (
              <TransactionListSkeleton />
            ) : (
              <TransactionList
                transactions={filteredTransactions}
                onDelete={deleteTransaction}
                onEdit={editTransaction}
                deletingId={deletingId}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}