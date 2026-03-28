'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CheckCircle2, Clock, Truck, Package } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { cn } from '@/lib/utils';

const ORDERS = [
  { id: '#8923', customer: 'Sarah Johnson', status: 'Delivered', amount: 124.50, date: '2 min ago' },
  { id: '#8922', customer: 'Michael Chen', status: 'Shipped', amount: 342.10, date: '45 min ago' },
  { id: '#8921', customer: 'Emma Wilson', status: 'Processing', amount: 89.00, date: '2 hours ago' },
  { id: '#8920', customer: 'James Miller', status: 'Delivered', amount: 210.45, date: '5 hours ago' },
  { id: '#8919', customer: 'Olivia Brown', status: 'Shipped', amount: 156.20, date: '1 day ago' },
];

const STATUS_CONFIG = {
  'Delivered': { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  'Shipped': { icon: Truck, color: 'text-brand-600', bg: 'bg-brand-50' },
  'Processing': { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
};

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Orders Overview</h1>
          <p className="text-sm font-medium text-gray-400 mt-1">Manage and track your store sales</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Transactions</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-[11px] font-bold text-gray-500 uppercase tracking-tight">
              <ShoppingBag size={14} /> Total: {ORDERS.length}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ORDERS.map((order, idx) => {
                  const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
                  return (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={order.id} 
                      className="hover:bg-gray-50/50 transition-colors cursor-default group"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-900">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-[10px] font-bold text-brand-600">
                            {order.customer.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-gray-600">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-tight", status.bg, status.color)}>
                          <status.icon size={12} />
                          {order.status}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-900">${order.amount.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{order.date}</span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gray-50/30 text-center">
            <button className="text-[11px] font-bold text-brand-600 uppercase tracking-widest hover:text-brand-700 transition-colors">
              View All Orders
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
