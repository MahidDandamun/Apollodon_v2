'use client';

import { useState } from 'react';
import { HeaderFloatingControls } from '@/components/layout/HeaderFloatingControls';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { WaterNetworkMap } from '@/components/dashboard/WaterNetworkMap';
import { StationReportTable } from '@/components/dashboard/StationReportTable';
import { motion } from 'framer-motion';
import { MOTION_TOKENS } from '@/lib/motion';
import { stationData } from '@/lib/data/data';

export default function Home() {
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null);

  const selectedStation = selectedStationId 
    ? stationData.find(s => s.id === selectedStationId) || null 
    : null;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-map-bg relative">
      <HeaderFloatingControls selectedStation={selectedStation} />
      
      {/* Background Map layer taking full screen */}
      <div className="absolute inset-0 z-0">
        <WaterNetworkMap 
          selectedStationId={selectedStationId}
          onSelectStation={(id) => setSelectedStationId(id === selectedStationId ? null : id)}
        />
      </div>

      {/* Floating Left Panel (Bottom sheet on mobile, left sidebar on desktop) */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.enter }}
        className="absolute left-0 bottom-0 w-full h-[55vh] md:h-auto md:left-4 md:top-4 md:bottom-4 md:w-[390px] z-20 glass-panel rounded-t-2xl md:rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all"
      >
        <DashboardOverview selectedStationId={selectedStationId} />
      </motion.div>

      {/* Floating Bottom Table (Hidden on small screens) */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.enter, delay: 0.1 }}
        className="hidden lg:flex absolute bottom-4 right-4 left-[420px] z-20 glass-panel rounded-lg shadow-2xl overflow-hidden h-[240px] flex-col"
      >
        <StationReportTable 
          selectedStationId={selectedStationId}
          onSelectStation={(id) => setSelectedStationId(id === selectedStationId ? null : id)}
        />
      </motion.div>
    </div>
  );
}
