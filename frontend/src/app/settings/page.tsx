'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Store, Globe, Save } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const SETTINGS_SECTIONS = [
  { 
    title: 'Account Settings', 
    icon: User, 
    items: [
      { label: 'Profile Information', description: 'Update your name and profile photo' },
      { label: 'Security', description: 'Manage your password and authentication' }
    ] 
  },
  { 
    title: 'Store Configuration', 
    icon: Store, 
    items: [
      { label: 'Store Details', description: 'Edit your store name and public URL' },
      { label: 'Region & Currency', description: 'Set your localized store settings' }
    ] 
  },
  { 
    title: 'Notifications', 
    icon: Bell, 
    items: [
      { label: 'Email Notifications', description: 'Toggle store activity alerts' },
      { label: 'Push Notifications', description: 'Browser and mobile alerts' }
    ] 
  }
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm font-medium text-gray-400 mt-1">Configure your dashboard and store preferences</p>
        </div>

        <div className="space-y-6">
          {SETTINGS_SECTIONS.map((section, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={section.title}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                 <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                    <section.icon size={20} />
                 </div>
                 <h3 className="font-bold text-gray-900">{section.title}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {section.items.map((item) => (
                  <button key={item.label} className="w-full p-6 flex flex-col items-start hover:bg-gray-50/50 transition-colors text-left group">
                    <p className="font-bold text-sm text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{item.label}</p>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tight">{item.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-end gap-3">
           <button className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
              Reset Changes
           </button>
           <button className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-xl shadow-indigo-100">
              <Save size={18} /> Save Changes
           </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
