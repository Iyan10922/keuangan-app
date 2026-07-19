import { Transaction } from "@/types/transaction";
import { formatYen } from "@/lib/currency";

type TransactionListProps = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
};

export default function TransactionList({
  transactions,
  onDelete,
  onEdit,
}: TransactionListProps) {
return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h3 className="text-xl font-bold text-slate-800">
        Riwayat Transaksi
      </h3>

      {transactions.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
          Belum ada transaksi.
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
            >
              <div>
                <p className="font-semibold text-slate-800">
                  {transaction.category}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {transaction.description || "Tanpa keterangan"}
                </p>
              </div>

              <div className="flex gap-2">
  <button
    onClick={() => onEdit(transaction)}
    className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
  >
    Edit
  </button>

  <button
    onClick={() => onDelete(transaction.id)}
    className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
  >
    Hapus
  </button>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}