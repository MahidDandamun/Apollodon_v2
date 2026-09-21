"use client";

import React, { useEffect, useState } from 'react';
import { Cloud, CloudDrizzle, CloudRain, CloudLightning, Sun, Wind, Droplets, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WeatherData {
  temp: number;
  precipitation: number;
  windSpeed: number;
  code: number;
}

export function WeatherOverlay() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Metro Manila / Pasig River corridor approx center
    const lat = 14.58;
    const lng = 121.03;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,precipitation,wind_speed_10m,weather_code&timezone=Asia%2FSingapore`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Weather API failed");
        return res.json();
      })
      .then(data => {
        setWeather({
          temp: data.current.temperature_2m,
          precipitation: data.current.precipitation,
          windSpeed: data.current.wind_speed_10m,
          code: data.current.weather_code,
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="h-6 w-6 text-yellow-500" />;
    if (code >= 1 && code <= 3) return <Cloud className="h-6 w-6 text-slate-400" />;
    if (code >= 51 && code <= 57) return <CloudDrizzle className="h-6 w-6 text-blue-400" />;
    if (code >= 61 && code <= 82) return <CloudRain className="h-6 w-6 text-blue-500" />;
    if (code >= 95 && code <= 99) return <CloudLightning className="h-6 w-6 text-purple-500" />;
    return <Cloud className="h-6 w-6 text-slate-400" />;
  };

  const getWeatherLabel = (code: number) => {
    if (code === 0) return "Clear Sky";
    if (code >= 1 && code <= 3) return "Cloudy";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 82) return "Rain";
    if (code >= 95 && code <= 99) return "Thunderstorm";
    return "Unknown";
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block absolute bottom-6 left-6 glass-panel p-4 rounded-xl z-20 w-64 border border-border-interactive shadow-lg backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-3 border-b border-border-subtle pb-2">
          <h3 className="text-body-sm font-semibold text-secondary tracking-wide uppercase">River Corridor Weather</h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <div className="h-6 w-6 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" />
            <span className="text-caption text-tertiary">Loading live weather...</span>
          </div>
        ) : error || !weather ? (
          <div className="flex items-center gap-3 text-status-warning p-2 bg-status-warning/10 rounded-lg">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-caption">Weather API unavailable</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {getWeatherIcon(weather.code)}
              <div>
                <div className="text-h3 text-primary">{Math.round(weather.temp)}°C</div>
                <div className="text-caption text-secondary">{getWeatherLabel(weather.code)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-caption">
              <div className="flex items-center gap-1.5 text-secondary bg-surface-elevated px-2 py-1.5 rounded-md">
                <Droplets className="h-3.5 w-3.5 text-accent-blue" />
                <span>{weather.precipitation} mm</span>
              </div>
              <div className="flex items-center gap-1.5 text-secondary bg-surface-elevated px-2 py-1.5 rounded-md">
                <Wind className="h-3.5 w-3.5 text-accent-cyan" />
                <span>{weather.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
