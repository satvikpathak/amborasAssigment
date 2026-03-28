'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { Activity } from 'lucide-react';
import { EVENT_TYPE_COLORS, EVENT_TYPE_LABELS } from '@/lib/config';

interface TimeSeriesEntry {
  hour: string;
  count: number;
  event_type: string;
}

interface EventsChartProps {
  data: TimeSeriesEntry[];
  isLoading: boolean;
}

function pivotData(data: TimeSeriesEntry[]) {
  const grouped: Record<string, any> = {};
  data.forEach((entry) => {
    const label = new Date(entry.hour).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    if (!grouped[entry.hour]) {
      grouped[entry.hour] = { hour: entry.hour, label, total: 0 };
    }
    grouped[entry.hour][entry.event_type] = entry.count;
    grouped[entry.hour].total += entry.count;
  });
  return Object.values(grouped).sort((a: any, b: any) => new Date(a.hour).getTime() - new Date(b.hour).getTime());
}

export function EventsChart({ data, isLoading }: EventsChartProps) {
  const pivoted = pivotData(data);
  const eventTypes = Array.from(new Set(data.map(d => d.event_type)));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-3xl border border-gray-100 card-shadow col-span-2"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-gray-900">Performance Trends</h3>
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Metrics over time</p>
        </div>
        <div className="flex items-center gap-4">
          {eventTypes.map(type => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: EVENT_TYPE_COLORS[type] }} />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">{EVENT_TYPE_LABELS[type]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full flex items-center justify-center">
        {isLoading ? (
          <div className="w-full h-full space-y-4">
            <div className="w-full h-full bg-gray-50 animate-pulse rounded-2xl flex items-end justify-between p-4 gap-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-t-lg w-full" style={{ height: `${Math.random() * 60 + 20}%` }} />
              ))}
            </div>
          </div>
        ) : pivoted.length === 0 ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Activity className="text-gray-300" size={32} />
            </div>
            <p className="text-sm font-bold text-gray-900">No data for this period</p>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-tight font-medium">Try adjusting your date range</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pivoted}>
              <defs>
                {eventTypes.map(type => (
                  <linearGradient key={type} id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={EVENT_TYPE_COLORS[type]} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={EVENT_TYPE_COLORS[type]} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="label" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              {eventTypes.map(type => (
                <Area
                  key={type}
                  type="monotone"
                  dataKey={type}
                  stroke={EVENT_TYPE_COLORS[type]}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill={`url(#gradient-${type})`}
                  animationDuration={1500}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
