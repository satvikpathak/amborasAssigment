import React from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  Store as StoreIcon,
  Menu,
  RefreshCw,
  Command
} from 'lucide-react';
import { useStore } from '@/lib/contexts/StoreContext';

const STORES = ['store_001', 'store_002', 'store_003'];

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { storeId, setStoreId } = useStore();

  return (
    <header className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="relative max-w-md w-full group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search analytics, events, or orders..." 
            className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Command size={14} className="text-gray-300" />
            <span className="text-[10px] font-bold text-gray-400">/</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Store Switcher */}
        <div className="relative group">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer hover:border-brand-200 transition-all">
            <StoreIcon size={14} className="text-brand-600" />
            <select 
              value={storeId} 
              onChange={(e) => setStoreId(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-700 outline-none appearance-none pr-4 cursor-pointer"
            >
              {STORES.map(s => (
                <option key={s} value={s}>{s.toUpperCase().replace('_', ' ')}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <button className="p-2 text-gray-400 hover:text-brand-600 transition-colors rounded-xl hover:bg-brand-50">
          <RefreshCw size={18} />
        </button>
        <button className="p-2 text-gray-400 hover:text-brand-600 transition-colors rounded-xl hover:bg-brand-50 relative">
          <Bell size={18} />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
        </button>
        
        <div className="h-8 w-[1px] bg-gray-100 mx-1" />
        
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-tight">Admin</p>
            <p className="text-[10px] font-medium text-gray-400 leading-tight">Platform Intern</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 border-2 border-white shadow-sm flex-shrink-0" />
        </div>
      </div>
    </header>
  );
}
