"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { stationData } from '@/lib/data/data';
import { Activity } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { WeatherOverlay } from './WeatherOverlay';

interface MapProps {
  selectedStationId: number | null;
  onSelectStation: (id: number) => void;
}

// Map styles for GeoJSON river
const riverStyle = {
  color: 'hsl(187, 85%, 53%)', // accent-cyan
  weight: 4,
  opacity: 0.8,
};

// Create custom icons for stations
const createCustomIcon = (station: typeof stationData[0], isSelected: boolean) => {
  let color = 'hsl(187, 85%, 53%)'; // cyan
  if (station.status === 'Warning') color = 'hsl(38, 92%, 55%)';
  if (station.status === 'Critical') color = 'hsl(0, 72%, 55%)';

  const html = renderToStaticMarkup(
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: isSelected ? '36px' : '28px',
        height: isSelected ? '36px' : '28px',
        borderRadius: '50%',
        backgroundColor: 'hsl(222, 47%, 5%)',
        border: `2px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isSelected ? `0 0 15px ${color}` : 'none',
        transition: 'all 0.2s ease'
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
      </div>
      
      {/* Label always visible next to marker */}
      <div style={{
        position: 'absolute',
        left: '100%',
        marginLeft: '10px',
        backgroundColor: isSelected ? color : 'hsl(221, 48%, 15%)',
        color: isSelected ? 'hsl(222, 47%, 5%)' : 'hsl(210, 40%, 96%)',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
        border: `1px solid ${isSelected ? color : 'hsl(219, 39%, 29%)'}`,
        fontWeight: isSelected ? 'bold' : 'normal'
      }}>
        {station.name}
      </div>
    </div>
  );

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

// Component to handle auto-panning to selected station
function MapController({ selectedStationId }: { selectedStationId: number | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedStationId) {
      const station = stationData.find(s => s.id === selectedStationId);
      if (station) {
        map.setView([station.coordinates.lat, station.coordinates.lng], 14, { animate: true });
      }
    }
  }, [selectedStationId, map]);
  return null;
}

export default function LeafletMap({ selectedStationId, onSelectStation }: MapProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    // Force cache bypass to get the fixed curves
    fetch(`/export.geojson?v=${Date.now()}`)
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={[14.58, 121.03]} 
        zoom={13} 
        style={{ width: '100%', height: '100%', background: 'hsl(222, 47%, 5%)' }}
        zoomControl={false}
      >
        {/* Free OSM tiles with CSS filter to make it dark */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          className="map-tiles-dark"
        />

        {geoData && (
          <GeoJSON data={geoData} style={riverStyle} />
        )}

        {stationData.map(station => (
          <Marker 
            key={station.id}
            position={[station.coordinates.lat, station.coordinates.lng]}
            icon={createCustomIcon(station, selectedStationId === station.id)}
            eventHandlers={{
              click: () => onSelectStation(station.id)
            }}
          >
            {/* Native Leaflet Tooltip for the hover details */}
            <Tooltip direction="top" offset={[0, -20]} opacity={1} className="custom-leaflet-tooltip">
              <div className="p-2 w-56">
                <div className="flex items-center justify-between mb-3 border-b border-border-subtle pb-2">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Activity className="h-3 w-3 text-accent-cyan" />
                    <span className="font-bold">{station.name}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    station.status === 'Critical' ? 'bg-status-critical/20 text-status-critical' :
                    station.status === 'Warning' ? 'bg-status-warning/20 text-status-warning' : 'bg-status-normal/20 text-status-normal'
                  }`}>
                    {station.status}
                  </span>
                </div>
                <div className="flex justify-between text-secondary text-xs mb-1">
                  <span>WQI Score:</span>
                  <span className="text-primary font-mono">{station.wqi}/100</span>
                </div>
                <div className="flex justify-between text-secondary text-xs">
                  <span>Trend:</span>
                  <span className={station.trendDelta > 0 ? "text-status-normal" : "text-status-warning"}>
                    {station.trendDelta > 0 ? '+' : ''}{station.trendDelta}%
                  </span>
                </div>
              </div>
            </Tooltip>
          </Marker>
        ))}

        <MapController selectedStationId={selectedStationId} />
      </MapContainer>

      {/* Weather Overlay stays fixed on screen */}
      <WeatherOverlay />
    </div>
  );
}
