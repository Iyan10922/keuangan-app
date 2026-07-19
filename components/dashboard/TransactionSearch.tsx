type TransactionSearchProps = {
    search: string;
    onSearchChange: (value: string) => void;
  };
  
  export default function TransactionSearch({
    search,
    onSearchChange,
  }: TransactionSearchProps) {
    return (
      <div className="mt-6">
        <input
          type="search"
          placeholder="Cari kategori atau keterangan..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-blue-500"
        />
      </div>
    );
  }