'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Zap, Target } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ActivityFeed } from '@/components/ActivityFeed';
import { useRecentActivity } from '@/hooks/useAnalytics';

export default function LiveEventsPage() {
  const { data: recentActivityRes, isLoading } = useRecentActivity();
  const recentActivity = recentActivityRes?.data || [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Live Event Stream</h1>
            <p className="text-sm font-medium text-gray-400 mt-1">Real-time interaction bridge for your store</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl text-emerald-600 text-xs font-bold ring-1 ring-inset ring-emerald-100">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               Live Monitoring Active
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ActivityFeed events={recentActivity} isLoading={isLoading} />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <Zap size={18} className="text-amber-500" /> Key Insights
               </h3>
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Peak Activity</p>
                     <p className="text-sm font-bold text-gray-900">Tuesday, 2:00 PM - 4:00 PM</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Top Event Type</p>
                     <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">Purchase Confirmation</p>
                  </div>
               </div>
            </div>

            <div className="bg-brand-600 p-6 rounded-3xl text-white shadow-xl shadow-brand-100">
               <Target size={24} className="mb-4 opacity-50" />
               <h4 className="font-bold mb-2">Advanced Filtering</h4>
               <p className="text-xs text-brand-100 opacity-80 leading-relaxed mb-4">
                 Filter events by custom parameters, user agents, and geolocation in the Pro version.
               </p>
               <button className="w-full py-2.5 bg-white text-brand-600 text-xs font-bold rounded-xl hover:bg-brand-50 transition-colors">
                 Learn More
               </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
