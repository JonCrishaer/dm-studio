import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ViewModeSelector({ mode, onChange }) {
  return (
    <div className="flex gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
      <button
        onClick={() => onChange('mobile')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all flex-1 ${
          mode === 'mobile'
            ? 'bg-white/10 text-white'
            : 'text-white/50 hover:text-white'
        }`}
      >
        <Smartphone className="w-4 h-4" />
        <span className="text-sm font-medium">Phone View</span>
      </button>
      <button
        onClick={() => onChange('desktop')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all flex-1 ${
          mode === 'desktop'
            ? 'bg-white/10 text-white'
            : 'text-white/50 hover:text-white'
        }`}
      >
        <Monitor className="w-4 h-4" />
        <span className="text-sm font-medium">Desktop View</span>
      </button>
    </div>
  );
}