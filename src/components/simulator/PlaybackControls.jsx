import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward, Clock } from 'lucide-react';

export default function PlaybackControls({
  isPlaying,
  onPlayPause,
  onReset,
  onSkip,
  speed,
  onSpeedChange,
  currentIndex,
  totalMessages,
  disabled
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Playback Controls</h3>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <span>{currentIndex}</span>
          <span>/</span>
          <span>{totalMessages}</span>
          <span className="text-white/30">messages</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          disabled={disabled}
          className="text-white/70 hover:text-white hover:bg-white/10 h-12 w-12"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={onPlayPause}
          disabled={disabled}
          className={`h-16 w-16 rounded-full ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onSkip}
          disabled={disabled || currentIndex >= totalMessages}
          className="text-white/70 hover:text-white hover:bg-white/10 h-12 w-12"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/50 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Message Delay
          </span>
          <span className="text-white font-medium">{speed}s</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={([value]) => onSpeedChange(value)}
          min={0.5}
          max={5}
          step={0.5}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-white/30">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / totalMessages) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}