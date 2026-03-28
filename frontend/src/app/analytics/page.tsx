'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Target, PieChart, ArrowUpRight } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { cn } from '@/lib/utils';

const ANALYTICS_CARDS = [
  { title: 'Customer Lifetime Value', value: '$840.50', trend: 8.4, icon: Target, color: 'text-indigo-600' },
  { title: 'Repeat Purchase Rate', value: '24.2%', trend: 1.2, icon: TrendingUp, color: 'text-emerald-600' },
  { title: 'Average Order Value', value: '$112.40', trend: -2.4, icon: BarChart3, color: 'text-amber-600' },
  { title: 'Cart Abandonment', value: '64.2%', trend: -5.1, icon: PieChart, color: 'text-rose-600' },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Deep Dive Analytics</h1>
          <p className="text-sm font-medium text-gray-400 mt-1">Advanced metrics for store growth</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ANALYTICS_CARDS.map((card, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={card.title}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("p-2 rounded-xl bg-gray-50", card.color)}>
                    <card.icon size={20} />
                 </div>
                 <div className={cn(
                   "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
                   card.trend > 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                 )}>
                   {card.trend > 0 ? '+' : ''}{card.trend}%
                 </div>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{card.title}</p>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{card.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-6">
                 <PieChart size={32} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Customer Segmentation</h4>
              <p className="text-sm text-gray-500 max-w-xs mb-6">Gain insights into user behavior and segment your audience for targeted marketing.</p>
              <button className="px-6 py-2.5 bg-indigo-600 text-white text-[11px] font-bold rounded-xl hover:bg-indigo-700 transition-colors">
                Enable Insights
              </button>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-6">
                 <ArrowUpRight size={32} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Predictive Forecasting</h4>
              <p className="text-sm text-gray-500 max-w-xs mb-6">AI-driven sales projections for the next 30, 60, and 90 days based on historical data.</p>
              <button className="px-6 py-2.5 bg-indigo-600 text-white text-[11px] font-bold rounded-xl hover:bg-indigo-700 transition-colors">
                View Forecasts
              </button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
