'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, MapPin, Calendar, Star } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { cn } from '@/lib/utils';

const CUSTOMERS = [
  { name: 'Sarah Johnson', email: 'sarah.j@example.com', location: 'New York, USA', spend: 1240.50, joinDate: 'Jan 2024', status: 'VIP' },
  { name: 'Michael Chen', email: 'm.chen@example.com', location: 'San Francisco, USA', spend: 842.10, joinDate: 'Feb 2024', status: 'Regular' },
  { name: 'Emma Wilson', email: 'emma.w@example.com', location: 'London, UK', spend: 2190.00, joinDate: 'Dec 2023', status: 'VIP' },
  { name: 'James Miller', email: 'j.miller@example.com', location: 'Berlin, DE', spend: 450.45, joinDate: 'Mar 2024', status: 'Regular' },
  { name: 'Olivia Brown', email: 'olivia.b@example.com', location: 'Sydney, AU', spend: 1560.20, joinDate: 'May 2023', status: 'VIP' },
];

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Customer Directory</h1>
          <p className="text-sm font-medium text-gray-400 mt-1">Manage relationships and loyal users</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Active Customers</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-[11px] font-bold text-gray-500 uppercase tracking-tight">
              <Users size={14} /> Total: {CUSTOMERS.length}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Spend</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Join Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {CUSTOMERS.map((customer, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={customer.email} 
                    className="hover:bg-gray-50/50 transition-colors cursor-default group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-xs ring-1 ring-inset ring-brand-100">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-gray-900 leading-tight">{customer.name}</p>
                          <div className={cn(
                            "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[8px] font-bold tracking-widest uppercase",
                            customer.status === 'VIP' ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-gray-50 text-gray-500 border border-gray-100"
                          )}>
                             {customer.status === 'VIP' && <Star size={8} className="fill-current" />}
                             {customer.status}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Mail size={12} className="text-gray-400" />
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-400 font-medium">
                        <MapPin size={12} className="text-gray-300" />
                        {customer.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-900">${customer.spend.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                         <span className="text-[11px] font-bold text-gray-500 tracking-tight uppercase">{customer.joinDate}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
