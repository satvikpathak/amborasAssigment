'use client';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  gradient?: string;
}

export function MetricCard({ title, value, subtitle, icon, trend, gradient }: MetricCardProps) {
  return (
    <div className="glass-card p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
          style={{ background: gradient || 'var(--gradient-primary)' }}
        >
          {icon}
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trend.isPositive
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-rose-500/10 text-rose-400'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        {title}
      </p>
      <p className="metric-value mt-1">{value}</p>
      {subtitle && (
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="glass-card p-6">
      <div className="shimmer-loading w-10 h-10 rounded-xl mb-4" />
      <div className="shimmer-loading w-20 h-4 rounded mb-2" />
      <div className="shimmer-loading w-32 h-8 rounded" />
    </div>
  );
}
