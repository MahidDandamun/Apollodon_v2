"use client";

import { Droplet } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { MOTION_TOKENS } from '@/lib/motion';
import { StationRecord } from '@/components/types/WaterQuality';

interface HeaderProps {
  selectedStation: StationRecord | null;
}

export function HeaderFloatingControls({ selectedStation }: HeaderProps) {
  return (
    <>
      {/* Logo positioned top left on mobile, right of left panel on desktop */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.enter }}
        className="absolute top-4 left-4 md:left-[420px] z-50 flex items-center gap-2 glass-panel px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-lg transition-all"
      >
        <div className="relative">
          <Droplet className="h-5 w-5 text-accent-cyan" />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
          </span>
        </div>
        <h1 className="text-h3 text-primary tracking-tight">Apollodon</h1>
      </motion.div>
      
      {/* Controls positioned top right */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.enter, delay: 0.05 }}
        className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2"
      >
        <div className="flex items-center gap-3 glass-panel px-3 py-1.5 rounded-lg shadow-lg">
          <Button variant="ghost" size="sm" className="hidden md:flex text-body-sm h-7 rounded-md text-secondary hover:text-primary hover:bg-surface-hover transition-colors">
            Region: NCR - Pasig River
          </Button>
          <div className="h-4 w-px bg-border mx-1"></div>
          <ThemeToggle />
        </div>
        
        {/* Dynamic WQI Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStation ? selectedStation.id : 'aggregate'}
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: MOTION_TOKENS.duration.normal, ease: MOTION_TOKENS.ease.layout }}
            className={`glass-panel px-3 py-1.5 rounded-lg shadow-lg border-l-2 flex items-center gap-2 ${
              selectedStation 
                ? selectedStation.status === 'Critical' ? 'border-l-status-critical'
                : selectedStation.status === 'Warning' ? 'border-l-status-warning'
                : 'border-l-status-normal'
                : 'border-l-accent-cyan'
            }`}
          >
            <span className="text-overline text-tertiary">
              {selectedStation ? 'STN WQI' : 'AVG WQI'}
            </span>
            <span className="text-metric-sm text-primary">
              {selectedStation ? selectedStation.wqi : 76}
            </span>
            {selectedStation && (
              <span className={`text-caption px-1.5 py-0.5 rounded-sm bg-background/50 ${
                selectedStation.status === 'Critical' ? 'text-status-critical'
                : selectedStation.status === 'Warning' ? 'text-status-warning'
                : 'text-status-normal'
              }`}>
                {selectedStation.status}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
