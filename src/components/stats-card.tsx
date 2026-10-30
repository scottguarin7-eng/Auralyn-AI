import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  color: string;
};

export function StatsCard({
  label,
  value,
  detail,
  icon: Icon,
  color,
}: StatsCardProps) {
  return (
    <div className="glass glass-hover rounded-3xl p-5">
      <div className="mb-5 flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{ background: `${color}22`, color }}
        >
          <Icon size={19} />
        </div>
        <span className="text-xs text-emerald-300">+{detail}</span>
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
