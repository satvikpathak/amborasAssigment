import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateRangeFilterProps {
  onRangeChange: (startDate: string, endDate: string) => void;
}

const PRESETS = [
  { label: 'Today', days: 0 },
  { label: '7 Days', days: 7 },
  { label: '30 Days', days: 30 },
];

export function DateRangeFilter({ onRangeChange }: DateRangeFilterProps) {
  const [active, setActive] = useState(2);
  const [showCustom, setShowCustom] = useState(false);
  const [customRange, setCustomRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const handlePreset = (index: number, days: number) => {
    setActive(index);
    setShowCustom(false);
    const endDate = new Date().toISOString();
    const startDate = new Date(
      days === 0
        ? new Date().setHours(0, 0, 0, 0)
        : Date.now() - days * 24 * 60 * 60 * 1000
    ).toISOString();
    onRangeChange(startDate, endDate);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomRange(prev => ({ ...prev, [name]: value }));
  };

  const applyCustomFilter = () => {
    if (customRange.start && customRange.end) {
      onRangeChange(
        new Date(customRange.start).toISOString(),
        new Date(customRange.end).toISOString()
      );
      setActive(-1); // Deactivate presets
      setShowCustom(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50">
        {PRESETS.map((preset, idx) => (
          <button
            key={preset.label}
            onClick={() => handlePreset(idx, preset.days)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 relative",
              active === idx && !showCustom
                ? "text-white" 
                : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {active === idx && !showCustom && (
              <motion.div layoutId="active-date" className="absolute inset-0 bg-indigo-600 rounded-xl" style={{ zIndex: 0 }} />
            )}
            <span className="relative z-10">{preset.label}</span>
          </button>
        ))}
        
        <div className="w-[1px] h-4 bg-gray-100 mx-1" />
        
        <button 
          onClick={() => setShowCustom(!showCustom)}
          className={cn(
            "px-3 py-2 rounded-xl transition-all relative",
            showCustom ? "text-white" : "text-gray-400 hover:text-indigo-600"
          )}
        >
          {showCustom && (
            <motion.div layoutId="active-date" className="absolute inset-0 bg-indigo-600 rounded-xl" style={{ zIndex: 0 }} />
          )}
          <Calendar size={16} className="relative z-10" />
        </button>
      </div>

      <AnimatePresence>
        {showCustom && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-3 z-[100] bg-white p-4 rounded-3xl border border-gray-100 shadow-2xl shadow-indigo-100/50 min-w-[280px]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Custom Range</span>
              <button 
                onClick={() => setShowCustom(false)}
                className="p-1.5 hover:bg-gray-50 rounded-xl text-gray-400"
              >
                <X size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter ml-1">Start Date</label>
                <input 
                  type="date"
                  name="start"
                  value={customRange.start}
                  onChange={handleCustomChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 outline-none focus:border-indigo-200 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter ml-1">End Date</label>
                <input 
                  type="date"
                  name="end"
                  value={customRange.end}
                  onChange={handleCustomChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 outline-none focus:border-indigo-200 transition-colors"
                />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-50">
               <button 
                 onClick={applyCustomFilter}
                 className="w-full py-2.5 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors"
               >
                 Apply Filter
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
