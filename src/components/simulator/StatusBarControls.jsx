import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

export default function StatusBarControls({ statusBar, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...statusBar, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">iPhone Status Bar</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-white/70 text-sm">Time</Label>
          <Input
            value={statusBar.time || '9:41'}
            onChange={(e) => handleChange('time', e.target.value)}
            placeholder="9:41"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm mb-2">
            <Label className="text-white/70">Signal Strength</Label>
            <span className="text-white font-medium">{statusBar.signal}/4 bars</span>
          </div>
          <Slider
            value={[statusBar.signal || 4]}
            onValueChange={([value]) => handleChange('signal', value)}
            min={0}
            max={4}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-white/30">
            <span>No Signal</span>
            <span>Full</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm mb-2">
            <Label className="text-white/70">Battery Level</Label>
            <span className="text-white font-medium">{statusBar.battery}%</span>
          </div>
          <Slider
            value={[statusBar.battery || 80]}
            onValueChange={([value]) => handleChange('battery', value)}
            min={0}
            max={100}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-white/30">
            <span>Empty</span>
            <span>Full</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}