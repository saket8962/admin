import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  isPositive: boolean;
  path: string;
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  trend,
  isPositive,
  path,
}: StatsCardProps) {
  return (
    <Link
      to={path}
      className="group bg-white p-6 rounded-2xl border border-border flex flex-col gap-4 shadow-sm hover:shadow-xl hover:border-accent/20 transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex justify-between items-start relative z-10">
        <div className="p-2 bg-secondary rounded-lg text-primary group-hover:bg-accent group-hover:text-white transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <div
          className={`flex items-center text-xs font-bold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend}
          {isPositive ? (
            <ArrowUpRight className="w-3 h-3 ml-0.5" />
          ) : (
            <ArrowDownRight className="w-3 h-3 ml-0.5" />
          )}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-bold text-muted uppercase tracking-widest group-hover:text-accent transition-colors">
          {label}
        </p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>

      <div className="absolute right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="w-4 h-4 text-accent" />
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
    </Link>
  );
}
