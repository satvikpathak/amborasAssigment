'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  Target, 
  Users, 
  Zap,
  Activity,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { 
  useOverview, 
  useTopProducts, 
  useRecentActivity, 
  useLiveVisitors 
} from '@/hooks/useAnalytics';
import { usePusher } from '@/hooks/usePusher';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard, StatCardSkeleton } from '@/components/StatCard';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { EventsChart } from '@/components/EventsChart';
import { TopProductsChart } from '@/components/TopProductsChart';
import { ActivityFeed } from '@/components/ActivityFeed';
import { useStore } from '@/lib/contexts/StoreContext';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ start?: string; end?: string }>({});
  const { storeId } = useStore();

  const { 
    data: overviewRes, 
    isLoading: overviewLoading, 
    error: overviewError,
    mutate: mutateOverview 
  } = useOverview(dateRange.start, dateRange.end);
  
  const { 
    data: productsRes, 
    isLoading: productsLoading,
    error: productsError 
  } = useTopProducts();
  
  const { 
    data: recentActivityRes, 
    isLoading: activityLoading, 
    error: activityError,
    mutate: mutateActivity 
  } = useRecentActivity();
  
  const { 
    data: liveVisitorsRes, 
    mutate: mutateLiveVisitors 
  } = useLiveVisitors();

  const overview = overviewRes?.data;
  const topProducts = productsRes?.data;
  const recentActivity = recentActivityRes?.data;
  const liveVisitors = liveVisitorsRes?.data;
  const realLatency = overviewRes?.latency || 0;

  const handleNewEvent = useCallback((event: any) => {
    mutateOverview();
    mutateActivity();
    mutateLiveVisitors();
  }, [mutateOverview, mutateActivity, mutateLiveVisitors]);

  usePusher(handleNewEvent);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  if (overviewError || productsError || activityError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200 border border-red-50 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-500 text-sm mb-6">Failed to load analytics data. Please check your network connection or store configuration.</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Performance Dashboard</h1>
              <p className="text-sm font-medium text-gray-400 mt-1">Real-time metrics for your store ecosystem</p>
            </div>
            <DateRangeFilter onRangeChange={(start, end) => setDateRange({ start, end })} />
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-6">
              {/* Stats Grid 2x2 */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-4 lg:gap-6"
              >
                {overviewLoading ? (
                  <>
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                  </>
                ) : (
                  <>
                    <StatCard 
                      index={0}
                      title="Gross Revenue" 
                      value={`$${(overview?.revenue.month || 0).toLocaleString()}`} 
                      icon={DollarSign}
                      trend={{ value: 12.5, isPositive: true }}
                    />
                    <StatCard 
                      index={1}
                      title="Conversion Rate" 
                      value={`${overview?.conversionRate || 0}%`} 
                      icon={Target}
                      trend={{ value: 0.8, isPositive: true }}
                    />
                    <StatCard 
                      index={2}
                      title="Live Visitors" 
                      value={liveVisitors?.activeVisitors || 0} 
                      icon={Users}
                      iconColor="text-emerald-500"
                    />
                    <StatCard 
                      index={3}
                      title="System Speed" 
                      value={`${realLatency}ms`} 
                      icon={Zap}
                      iconColor="text-amber-500"
                      trend={{ value: realLatency < 100 ? (100 - realLatency) : 0, isPositive: realLatency < 100 }}
                    />
                  </>
                )}
              </motion.div>

              <div className="space-y-6">
                <EventsChart data={overview?.timeSeries || []} isLoading={overviewLoading} />
                <TopProductsChart data={topProducts || []} isLoading={productsLoading} />
              </div>
              
              {/* Promo Banner */}
              <div className="bg-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden group border border-indigo-500/20 shadow-xl shadow-indigo-100">
                 <div className="relative z-10 flex items-center justify-between">
                   <div className="max-w-md text-center md:text-left">
                     <h3 className="text-lg font-bold mb-1">Automate insights</h3>
                     <p className="text-indigo-100 text-[11px] opacity-90 leading-relaxed mb-4">
                       Sync your store with our AI engine.
                     </p>
                     <button className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 text-[11px] font-bold rounded-xl hover:bg-indigo-50 transition-colors mx-auto md:mx-0">
                        Connect Store <ArrowRight size={14} />
                     </button>
                   </div>
                   <div className="hidden md:block">
                      <Activity size={80} className="text-indigo-500/30 opacity-50" />
                   </div>
                 </div>
                 <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
              </div>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-24">
               <ActivityFeed events={recentActivity || []} isLoading={activityLoading} />
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
}
