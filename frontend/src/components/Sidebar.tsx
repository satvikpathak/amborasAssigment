'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  TrendingUp,
  Package,
  Activity,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: ShoppingCart, label: 'Orders', href: '/orders' },
  { icon: Package, label: 'Products', href: '/products' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: Activity, label: 'Live Events', href: '/live-events' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
];

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  const sidebarContent = (
    <aside className={cn(
      "fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-100 flex flex-col z-[100] transition-transform duration-300 ease-in-out lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-200">
              A
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">eCom</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-gray-900 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Main Menu</p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.label} href={item.href} onClick={onClose}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer overflow-hidden",
                    isActive ? "bg-brand-50 text-brand-700 font-bold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={cn(isActive ? "text-brand-500" : "text-gray-400")} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-4 space-y-3 bg-white border-t border-gray-50">
        <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
          <div className="flex items-center gap-2 mb-1.5 text-gray-900 font-semibold text-[11px]">
            <TrendingUp size={12} className="text-brand-500" />
            <span>Pro Plan</span>
          </div>
          <button className="w-full py-1.5 bg-brand-500 text-white text-[10px] font-bold rounded-lg shadow-md hover:bg-brand-600 transition-colors">
            Upgrade
          </button>
        </div>

        <div className="space-y-0.5">
          <Link href="/settings">
            <motion.div 
              whileHover={{ x: 4 }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer",
                pathname === '/settings' ? "bg-brand-50 text-brand-700 font-bold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Settings size={16} className={cn(pathname === '/settings' ? "text-brand-500" : "text-gray-400")} />
              <span className="text-sm">Settings</span>
            </motion.div>
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem('eCom_token');
              window.location.href = '/login';
            }}
            className="w-full flex items-center gap-3 px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-all group"
          >
            <LogOut size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>
      {sidebarContent}
    </>
  );
}
