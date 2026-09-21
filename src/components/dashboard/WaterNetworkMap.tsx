"use client";

import dynamic from 'next/dynamic';

interface MapProps {
  selectedStationId: number | null;
  onSelectStation: (id: number) => void;
}

const Map = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-surface-base text-secondary gap-3">
      <div className="h-8 w-8 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" />
      <span className="font-mono text-sm tracking-widest uppercase">Initializing Geospatial Engine...</span>
    </div>
  )
});

export function WaterNetworkMap(props: MapProps) {
  return <Map {...props} />;
}
