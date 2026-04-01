'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate network delay
    setTimeout(() => {
      if (email === 'eCom@demo.com' && password === 'demo') {
        localStorage.setItem('eCom_token', 'mock_token_123');
        router.push('/');
      } else {
        setError('Invalid credentials. Check the demo info below.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-warm-bg flex items-center justify-center p-4 selection:bg-brand-100 selection:text-brand-900">
      <div className="w-full max-w-md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-2xl shadow-brand-100/20 overflow-hidden relative"
        >
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-50 rounded-full blur-3xl opacity-50" />
          
          <div className="text-center mb-10 relative">
            <motion.div
              variants={itemVariants}
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-20 h-20 bg-brand-600 rounded-[24px] flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6 shadow-xl shadow-brand-200"
            >
              A
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-3xl font-extrabold text-gray-900 tracking-tight">
              eCom Analytics
            </motion.h1>
            <motion.p variants={itemVariants} className="text-sm font-medium text-gray-400 mt-2">
              The Command Center for your eCommerce Store
            </motion.p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 relative">
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-600 transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eCom@demo.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-600 transition-all font-medium"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-600 transition-colors" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-600 transition-all font-medium"
                />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-4 bg-brand-50/50 rounded-2xl border border-brand-100/50 flex flex-col gap-2 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-2 text-brand-200 group-hover:text-brand-300 transition-colors">
                 <Info size={14} />
              </div>
              <p className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest">Demo Credentials</p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <div className="flex items-center gap-1.5">
                   <span className="text-[10px] font-bold text-brand-300 uppercase">Email:</span>
                   <span className="text-xs font-bold text-brand-900/70">eCom@demo.com</span>
                </div>
                <div className="flex items-center gap-1.5">
                   <span className="text-[10px] font-bold text-brand-300 uppercase">Pass:</span>
                   <span className="text-xs font-bold text-brand-900/70">demo</span>
                </div>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 p-4 bg-rose-50 rounded-2xl border border-rose-100 text-rose-600 text-[11px] font-bold shadow-sm shadow-rose-100/20"
              >
                <AlertCircle size={14} className="flex-shrink-0" /> {error}
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-4 bg-brand-600 text-white font-bold rounded-2xl hover:bg-brand-700 active:bg-brand-800 transition-all shadow-xl shadow-brand-100 flex items-center justify-center gap-2 group",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <motion.p variants={itemVariants} className="text-center mt-10 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">
             New here? <span className="text-brand-600 cursor-pointer hover:text-brand-700 underline underline-offset-4 decoration-brand-200 hover:decoration-brand-600 transition-all">Request Dashboard Access</span>
          </motion.p>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-[10px] text-gray-400 mt-10 font-bold uppercase tracking-widest opacity-60"
        >
          &copy; 2026 eCom Powered By Enterprise AI
        </motion.p>
      </div>
    </div>
  );
}
