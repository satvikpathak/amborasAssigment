'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Trophy } from 'lucide-react';

interface TopProduct {
  product_id: string;
  product_name: string;
  total_revenue: number;
  purchase_count: number;
}

interface TopProductsChartProps {
  data: TopProduct[];
  isLoading: boolean;
}

const COLORS = ['#4f46e5', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

export function TopProductsChart({ data, isLoading }: TopProductsChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-3xl border border-gray-100 card-shadow"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-gray-900">Top Performers</h3>
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">By Revenue</p>
        </div>
        <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
          <Trophy size={18} />
        </div>
      </div>

      <div className="h-[300px] w-full flex items-center justify-center">
        {isLoading ? (
          <div className="w-full h-full space-y-4 py-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-20 h-3 bg-gray-50 animate-pulse rounded-full" />
                <div className="flex-1 h-3 bg-gray-50 animate-pulse rounded-full" style={{ width: `${Math.random() * 60 + 40}%` }} />
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="text-gray-300" size={32} />
            </div>
            <p className="text-sm font-bold text-gray-900">No products found</p>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-tight font-medium">Try another store or date range</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
              <XAxis 
                type="number" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }}
                tickFormatter={(v) => `$${v}`}
              />
              <YAxis 
                type="category" 
                dataKey="product_name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 600 }}
                width={80}
              />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
              />
              <Bar 
                dataKey="total_revenue" 
                radius={[0, 8, 8, 0]} 
                barSize={20}
                animationDuration={1500}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
