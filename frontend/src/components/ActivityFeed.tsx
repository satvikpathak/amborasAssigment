'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EVENT_TYPE_LABELS, EVENT_TYPE_COLORS } from '@/lib/config';
import { CircleDot, ShoppingBag, XCircle, CreditCard, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentEvent {
  event_id: string;
  store_id: string;
  event_type: string;
  timestamp: string;
  data: Record<string, any>;
}

interface ActivityFeedProps {
  events: RecentEvent[];
  isLoading: boolean;
}

const EVENT_ICONS: Record<string, any> = {
  page_view: { icon: CircleDot, color: "text-blue-500", bg: "bg-blue-50" },
  add_to_cart: { icon: ShoppingBag, color: "text-cyan-500", bg: "bg-cyan-50" },
  remove_from_cart: { icon: XCircle, color: "text-rose-500", bg: "bg-rose-50" },
  checkout_started: { icon: CreditCard, color: "text-amber-500", bg: "bg-amber-50" },
  purchase: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
};

function getTimeLabel(timestamp: string): string {
  const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export function ActivityFeed({ events, isLoading }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 card-shadow h-full flex flex-col">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Clock size={18} className="text-gray-400" />
          Live Activity
        </h3>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          Real-time
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 min-h-[400px] flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="w-full space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="p-4 flex gap-4 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 bg-gray-50 rounded" />
                  <div className="h-2 w-full bg-gray-50 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="text-gray-300" size={32} />
            </div>
            <p className="text-sm font-bold text-gray-900">No recent activity</p>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-tight font-medium text-center">Waiting for new events...</p>
          </div>
        ) : (
          <div className="w-full">
            {events.map((event, idx) => {
              const config = EVENT_ICONS[event.event_type] || { icon: CircleDot, color: "text-gray-500", bg: "bg-gray-50" };
              return (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={event.event_id}
                  className="group p-4 flex gap-4 hover:bg-gray-50/80 rounded-2xl transition-all cursor-default"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform", config.bg, config.color)}>
                    <config.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-[12px] font-bold text-gray-900 truncate uppercase tracking-tight">
                        {EVENT_TYPE_LABELS[event.event_type] || event.event_type.replace('_', ' ')}
                      </p>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter whitespace-nowrap">
                        {getTimeLabel(event.timestamp)}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate leading-relaxed">
                      {event.event_type === 'purchase' || event.event_type === 'add_to_cart'
                        ? `${event.data.product_name || 'Product'} · $${event.data.amount || 0}`
                        : event.data.page || event.data.url || 'Interaction recorded'}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50/50 border-t border-gray-100 mt-auto rounded-b-3xl">
        <button className="w-full py-2.5 text-[11px] font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest">
          View All Logs
        </button>
      </div>
    </div>
  );
}
