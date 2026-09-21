"use client";

import React from 'react';
import { stationData } from '@/lib/data/data';
import { motion } from 'framer-motion';
import { MOTION_TOKENS } from '@/lib/motion';

interface TableProps {
  selectedStationId: number | null;
  onSelectStation: (id: number) => void;
}

export function StationReportTable({ selectedStationId, onSelectStation }: TableProps) {
  return (
    <div className="w-full h-full flex flex-col bg-transparent">
      <div className="px-6 py-4 border-b border-border-subtle flex justify-between items-center shrink-0">
        <h3 className="text-h3 text-primary drop-shadow-sm">Station Report</h3>
        <button className="text-body-sm text-accent-cyan hover:text-accent-blue transition-colors">View All &rarr;</button>
      </div>
      
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        <table className="w-full text-left">
          <thead className="bg-surface-elevated/80 backdrop-blur-md border-b border-border-subtle sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-overline text-tertiary">Station</th>
              <th className="px-6 py-4 text-overline text-tertiary">Location</th>
              <th className="px-6 py-4 text-overline text-tertiary">WQI</th>
              <th className="px-6 py-4 text-overline text-tertiary">Status</th>
              <th className="px-6 py-4 text-overline text-tertiary">Last Reading</th>
              <th className="px-6 py-4 text-overline text-tertiary text-right">Priority</th>
            </tr>
          </thead>
          <tbody>
            {stationData.map((station, i) => {
              const isSelected = selectedStationId === station.id;
              
              return (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: MOTION_TOKENS.duration.normal, ease: MOTION_TOKENS.ease.enter, delay: i * MOTION_TOKENS.stagger.rows + 0.2 }}
                  whileTap={{ scale: 0.99 }}
                  key={station.id} 
                  onClick={() => onSelectStation(station.id)}
                  className={`border-b border-border-subtle transition-colors cursor-pointer group ${
                    isSelected ? 'bg-surface-hover' : 'hover:bg-surface-elevated'
                  }`}
                >
                  <td className={`px-6 py-4 text-mono whitespace-nowrap transition-colors ${isSelected ? 'text-accent-cyan' : 'text-primary group-hover:text-accent-cyan'}`}>
                    {station.name}
                  </td>
                  <td className="px-6 py-4 text-body-sm text-secondary">
                    {station.location}
                  </td>
                  <td className="px-6 py-4 text-body text-primary font-bold">
                    {station.wqi}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        station.status === 'Critical' ? 'bg-status-critical shadow-[0_0_8px_var(--status-critical)]' :
                        station.status === 'Warning' ? 'bg-status-warning shadow-[0_0_8px_var(--status-warning)]' : 'bg-status-normal shadow-[0_0_8px_var(--status-normal)]'
                      }`}></div>
                      <span className="text-body-sm text-secondary">{station.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-caption text-tertiary">
                    {station.lastReading}
                  </td>
                  <td className={`px-6 py-4 text-body-sm text-right ${
                    station.priority === 'High' ? 'text-status-critical' :
                    station.priority === 'Medium' ? 'text-status-warning' : 'text-status-normal'
                  }`}>
                    {station.priority}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
