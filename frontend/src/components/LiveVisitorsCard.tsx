'use client';

interface LiveVisitorsCardProps {
  count: number;
  isConnected: boolean;
}

export function LiveVisitorsCard({ count, isConnected }: LiveVisitorsCardProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          Live Visitors
        </p>
        <div className="flex items-center gap-2">
          <div
            className="pulse-dot"
            style={{
              backgroundColor: isConnected ? 'var(--accent-emerald)' : 'var(--text-muted)',
            }}
          />
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {isConnected ? 'Live' : 'Polling'}
          </span>
        </div>
      </div>
      <div className="flex items-end gap-3">
        <span className="metric-value">{count.toLocaleString()}</span>
        <span className="text-xs pb-1" style={{ color: 'var(--text-muted)' }}>
          in last 5 min
        </span>
      </div>
    </div>
  );
}
