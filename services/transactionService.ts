import type { Transaction } from "@/types/transaction";

import {
  getCurrentUserId,
  getTransactionsFromDb,
  createTransactionToDb,
  updateTransactionInDb,
  deleteTransactionFromDb,
} from "@/repositories/transactionRepository";

export async function getTransactions() {
  const userId = await getCurrentUserId();

  return (await getTransactionsFromDb(userId)) as Transaction[];
}

export async function createTransaction(
  transaction: Omit<Transaction, "id" | "created_at" | "user_id">
) {
  const userId = await getCurrentUserId();

  return (await createTransactionToDb({
    ...transaction,
    user_id: userId,
  })) as Transaction;
}

export async function updateTransaction(
  id: string,
  transaction: Omit<Transaction, "id" | "created_at" | "user_id">
) {
  const userId = await getCurrentUserId();

  return (await updateTransactionInDb(
    id,
    userId,
    transaction
  )) as Transaction;
}

export async function deleteTransaction(id: string) {
  const userId = await getCurrentUserId();

  await deleteTransactionFromDb(id, userId);
}