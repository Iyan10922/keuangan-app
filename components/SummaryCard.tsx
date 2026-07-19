type SummaryCardProps = {
    title: string;
    value: string;
    color?: string;
  };
  
  export default function SummaryCard({
    title,
    value,
    color = "text-slate-800",
  }: SummaryCardProps) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        <p className="text-sm text-slate-500">{title}</p>
  
        <h3 className={`mt-2 text-2xl font-bold ${color}`}>
          {value}
        </h3>
      </div>
    );
  }