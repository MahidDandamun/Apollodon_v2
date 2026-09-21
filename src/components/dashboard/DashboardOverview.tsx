"use client";

import React, { useMemo, useState } from 'react';
import { Droplets, ThermometerSun, Wind, FlaskConical, Zap, ShieldAlert, Info, LayoutGrid, BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { waterQualityData, alertsData, stationData, stationHistoricalData } from '@/lib/data/data';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { MOTION_TOKENS, containerVariants, itemVariants } from '@/lib/motion';

const ToolButton = ({ icon: Icon, active, onClick }: { icon: React.ElementType, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-1.5 rounded-md flex items-center justify-center transition-all ${
      active 
        ? 'bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-primary))] shadow-sm ring-1 ring-[hsl(var(--border-interactive))]' 
        : 'text-[hsl(var(--text-tertiary))] hover:text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--surface-hover))]'
    }`}
  >
    <Icon className="h-4 w-4" />
  </button>
);

interface KPICardProps {
  title: string;
  value: string | number;
  unit: string;
  trend: number;
  icon: React.ElementType;
  colorClass: string;
}

const KPICard = ({ title, value, unit, trend, icon: Icon, colorClass }: KPICardProps) => (
  <motion.div variants={itemVariants} className="glass-panel p-2.5 rounded-md border border-border-subtle shadow-sm flex flex-col justify-between group hover:border-border-interactive transition-colors">
    <div className="flex justify-between items-start mb-1.5">
      <span className="text-overline text-tertiary font-semibold tracking-wider drop-shadow-sm">{title}</span>
      <Icon className="h-3 w-3 text-secondary group-hover:text-primary transition-colors" />
    </div>
    <div className="flex items-end justify-between">
      <div className="flex items-baseline gap-1">
        <span className="text-metric-sm text-primary drop-shadow-sm">{value}</span>
        <span className="text-caption text-secondary">{unit}</span>
      </div>
      <div className={`h-2 w-2 rounded-full ${colorClass} drop-shadow-md`}></div>
    </div>
    <div className="flex items-center gap-1 mt-1">
      {trend > 0 ? (
        <TrendingUp className="h-3 w-3 text-status-normal" />
      ) : (
        <TrendingDown className="h-3 w-3 text-status-warning" />
      )}
      <span className={`text-[10px] font-bold ${trend > 0 ? 'text-status-normal' : 'text-status-warning'}`}>
        {Math.abs(trend)}%
      </span>
    </div>
  </motion.div>
);

export function DashboardOverview({ selectedStationId }: { selectedStationId: number | null }) {
  const [viewMode, setViewMode] = useState<'grid' | 'chart'>('grid');
  
  const station = selectedStationId ? stationData.find(s => s.id === selectedStationId) : null;
  const chartData = selectedStationId && stationHistoricalData[selectedStationId] 
    ? stationHistoricalData[selectedStationId] 
    : waterQualityData;

  const kpis = useMemo(() => {
    if (station) {
      return {
        ph: station.ph || 7.2,
        do: station.dissolved_oxygen || 8.4,
        turb: station.turbidity || 5.2,
        temp: station.temperature || 16,
      };
    }
    return { ph: 7.2, do: 8.4, turb: 5.2, temp: 16 };
  }, [station]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-full bg-transparent overflow-hidden p-3 gap-2"
    >
      
      {/* Header & Toolbar */}
      <motion.div variants={itemVariants} className="flex items-start justify-between shrink-0">
        <div className="flex flex-col">
          <h2 className="text-h4 text-primary drop-shadow-sm">
            {station ? station.name : 'Water Quality Overview'}
          </h2>
          <AnimatePresence mode="wait">
            <motion.p 
              key={station ? station.id : 'overview'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: MOTION_TOKENS.duration.fast }}
              className="text-caption text-secondary"
            >
              {station ? `${station.location} Station Data` : 'Monitor, analyze, and manage.'}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex gap-1 bg-surface-base p-0.5 rounded-lg border border-border-subtle shadow-inner">
          <ToolButton icon={LayoutGrid} active={viewMode === 'grid'} onClick={() => setViewMode('grid')} />
          <ToolButton icon={BarChart2} active={viewMode === 'chart'} onClick={() => setViewMode('chart')} />
        </div>
      </motion.div>

      {viewMode === 'grid' ? (
        <>
          {/* KPI Grid */}
          <div className="grid grid-cols-2 gap-1.5 shrink-0">
            <KPICard title="pH Level" value={kpis.ph.toFixed(1)} unit="pH" trend={1.2} icon={FlaskConical} colorClass="bg-accent-blue" />
            <KPICard title="Dissolved O2" value={kpis.do.toFixed(1)} unit="mg/L" trend={-0.5} icon={Wind} colorClass="bg-accent-cyan" />
            <KPICard title="Turbidity" value={kpis.turb.toFixed(1)} unit="NTU" trend={-2.1} icon={Droplets} colorClass="bg-status-warning" />
            <KPICard title="Temperature" value={kpis.temp.toFixed(1)} unit="°C" trend={0.8} icon={ThermometerSun} colorClass="bg-status-critical" />
          </div>

          {/* Chart Section */}
          <motion.div variants={itemVariants} className="shrink-0">
            <Card className="border border-border-subtle shadow-sm overflow-hidden rounded-md bg-surface-elevated/50 hover:bg-surface-elevated transition-colors">
              <CardHeader className="pb-0 pt-2 px-3 flex flex-row items-center justify-between bg-transparent">
                <CardTitle className="text-body-sm text-primary drop-shadow-sm">WQI Trend</CardTitle>
                <select className="text-[10px] border border-border-interactive rounded px-1 py-0.5 bg-surface-base text-secondary focus:ring-1 focus:ring-accent-cyan cursor-pointer outline-none transition-shadow">
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </CardHeader>
              <CardContent className="p-2 pt-2 h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(-6)} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border-subtle))" />
                <XAxis dataKey="name" stroke="hsl(var(--text-tertiary))" tickLine={false} axisLine={false} tick={{ fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 500, fill: 'hsl(var(--text-tertiary))' }} dy={5} />
                <YAxis stroke="hsl(var(--text-tertiary))" tickLine={false} axisLine={false} tick={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 500, fill: 'hsl(var(--text-tertiary))' }} domain={[40, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--surface-elevated))', borderRadius: '8px', border: '1px solid hsl(var(--border-interactive))', color: 'hsl(var(--text-primary))' }}
                  itemStyle={{ color: 'hsl(var(--text-primary))', fontSize: '12px', fontFamily: 'var(--font-mono)' }}
                  labelStyle={{ color: 'hsl(var(--text-secondary))', fontSize: '11px', marginBottom: '4px' }}
                  cursor={{ fill: 'hsl(var(--surface-hover))', opacity: 0.5 }}
                />
                <Bar dataKey="wqi" radius={[4, 4, 0, 0]} maxBarSize={24} animationDuration={MOTION_TOKENS.duration.slow * 1000}>
                  {chartData.slice(-6).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? 'hsl(var(--accent-cyan))' : 'hsl(var(--surface-hover))'} className="transition-all duration-300 hover:fill-accent-cyan/80" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
      </>
      ) : (
        <motion.div variants={itemVariants} className="flex-1 shrink-0 flex flex-col mb-4">
          <Card className="border border-border-subtle shadow-sm overflow-hidden rounded-md bg-surface-elevated/50 h-full flex flex-col">
            <CardHeader className="pb-0 pt-3 px-4 flex flex-row items-center justify-between bg-transparent shrink-0">
              <CardTitle className="text-body-sm text-primary drop-shadow-sm">Detailed Analytics</CardTitle>
              <select className="text-[10px] border border-border-interactive rounded px-1 py-0.5 bg-surface-base text-secondary focus:ring-1 focus:ring-accent-cyan cursor-pointer outline-none transition-shadow">
                <option>WQI vs Dissolved O2</option>
                <option>pH Levels</option>
              </select>
            </CardHeader>
            <CardContent className="p-3 pt-4 flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border-subtle))" />
                  <XAxis dataKey="name" stroke="hsl(var(--text-tertiary))" tickLine={false} axisLine={false} tick={{ fontSize: 11, fontFamily: 'var(--font-inter)', fontWeight: 500, fill: 'hsl(var(--text-tertiary))' }} dy={10} />
                  <YAxis stroke="hsl(var(--text-tertiary))" tickLine={false} axisLine={false} tick={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 500, fill: 'hsl(var(--text-tertiary))' }} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--surface-elevated))', borderRadius: '8px', border: '1px solid hsl(var(--border-interactive))', color: 'hsl(var(--text-primary))' }}
                    itemStyle={{ color: 'hsl(var(--text-primary))', fontSize: '12px', fontFamily: 'var(--font-mono)' }}
                    labelStyle={{ color: 'hsl(var(--text-secondary))', fontSize: '11px', marginBottom: '4px' }}
                  />
                  <Line type="monotone" dataKey="wqi" stroke="hsl(var(--accent-cyan))" strokeWidth={3} dot={{ fill: 'hsl(var(--surface-base))', stroke: 'hsl(var(--accent-cyan))', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: 'hsl(var(--accent-cyan))', stroke: 'hsl(var(--surface-base))' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AI Insights */}
      <motion.div variants={itemVariants} className="flex-1 flex flex-col min-h-0">
        <h3 className="text-overline text-tertiary flex items-center gap-1.5 mb-2 drop-shadow-sm">
          <Zap className="h-3 w-3 text-status-warning" /> AI Insights
        </h3>
        <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar">
          {alertsData.filter(a => !selectedStationId || a.stationId === selectedStationId).map((alert) => (
            <motion.div 
              key={alert.id} 
              whileHover={{ scale: 0.99 }}
              whileTap={{ scale: 0.97 }}
              className="border border-border-subtle rounded-lg p-3 bg-surface-elevated/50 shadow-sm group hover:border-border-interactive hover:bg-surface-elevated transition-all cursor-pointer flex-shrink-0"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`p-1 rounded-md ${alert.type === 'Critical' ? 'bg-status-critical/20 text-status-critical' : alert.type === 'Warning' ? 'bg-status-warning/20 text-status-warning' : 'bg-accent-cyan/20 text-accent-cyan'}`}>
                  {alert.type === 'Critical' ? <ShieldAlert className="h-3 w-3" /> : <Info className="h-3 w-3" />}
                </div>
                <span className="text-caption font-semibold text-primary">{alert.type} Alert</span>
              </div>
              <p className="text-body-sm text-secondary mb-2 leading-relaxed line-clamp-2">{alert.message}</p>
              <div className="flex justify-between items-center">
                <span className="text-overline text-tertiary">{alert.stationName}</span>
                <span className="text-caption font-semibold px-1.5 py-0.5 rounded text-primary bg-surface-hover opacity-0 group-hover:opacity-100 transition-opacity">
                  View &rarr;
                </span>
              </div>
            </motion.div>
          ))}
          {selectedStationId && alertsData.filter(a => a.stationId === selectedStationId).length === 0 && (
            <div className="text-center py-4 text-secondary text-body-sm">
              No active alerts for this station.
            </div>
          )}
        </div>
      </motion.div>
      
    </motion.div>
  );
}
