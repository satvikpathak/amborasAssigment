'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, AlertCircle, ShoppingCart } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { cn } from '@/lib/utils';

const PRODUCTS = [
  { name: 'Aethra Headset', price: 299.00, sales: 124, stock: 45, trend: 12 },
  { name: 'Lumina Keyboard', price: 149.00, sales: 89, stock: 12, trend: 8 },
  { name: 'Nexus Mouse', price: 79.00, sales: 210, stock: 0, trend: 24 },
  { name: 'Vortex Controller', price: 59.00, sales: 56, stock: 82, trend: -5 },
];

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Product Catalog</h1>
          <p className="text-sm font-medium text-gray-400 mt-1">Monitor inventory and sales performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={product.name}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4 group-hover:scale-110 transition-transform">
                <Package size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm font-bold text-brand-600 mb-4">${product.price.toFixed(2)}</p>
              
              <div className="space-y-3 pt-4 border-t border-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1.5">
                    <ShoppingCart size={12} /> Total Sales
                  </span>
                  <span className="text-sm font-bold text-gray-900">{product.sales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1.5">
                    <TrendingUp size={12} /> Growth
                  </span>
                  <span className={cn("text-[11px] font-bold", product.trend > 0 ? "text-emerald-600" : "text-rose-600")}>
                    {product.trend > 0 ? '+' : ''}{product.trend}%
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                   <div className={cn(
                     "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
                     product.stock === 0 ? "bg-rose-50 text-rose-600" : product.stock < 20 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                   )}>
                     {product.stock === 0 ? 'Out of Stock' : product.stock < 20 ? 'Low Stock' : 'In Stock'}
                   </div>
                   <span className="text-[10px] font-bold text-gray-400">{product.stock} left</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
