type MonthFilterProps = {
    selectedMonth: string;
    onMonthChange: (month: string) => void;
  };
  
  export default function MonthFilter({
    selectedMonth,
    onMonthChange,
  }: MonthFilterProps) {
    return (
      <div className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <label
          htmlFor="month-filter"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Pilih bulan
        </label>
  
        <input
          id="month-filter"
          type="month"
          value={selectedMonth}
          onChange={(event) => onMonthChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-auto"
        />
      </div>
    );
  }