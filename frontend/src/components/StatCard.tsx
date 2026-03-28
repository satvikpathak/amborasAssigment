'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  className?: string;
  iconColor?: string;
  index?: number;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  subtitle, 
  className,
  iconColor = "text-indigo-600",
  index = 0
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={cn(
        "bg-white p-5 rounded-3xl border border-gray-100 card-shadow transition-shadow hover:card-shadow-hover",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-2xl bg-gray-50", iconColor)}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full",
            trend.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trend.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
        {subtitle && (
          <p className="text-[11px] text-gray-400 mt-2 font-medium">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 card-shadow">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex-shrink-0 mb-4 animate-pulse" />
      <div className="h-4 w-20 bg-gray-50 rounded mb-2 animate-pulse" />
      <div className="h-8 w-32 bg-gray-50 rounded animate-pulse" />
    </div>
  );
}
