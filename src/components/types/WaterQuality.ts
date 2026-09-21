export interface WaterQualityRecord {
  name: string;
  ph: number;
  dissolved_oxygen: number;
  turbidity: number;
  temperature: number;
  wqi: number;
  predicted_wqi: number;
  predicted_ph: number;
}

export interface StationRecord {
  id: number;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number; x?: number; y?: number };
  status: 'Normal' | 'Warning' | 'Critical';
  lastReading: string;
  wqi: number;
  trend: 'up' | 'down' | 'stable';
  trendDelta: number;
  priority: 'Low' | 'Medium' | 'High';
  ph?: number;
  dissolved_oxygen?: number;
  turbidity?: number;
  temperature?: number;
}

export interface StationHistoricalData {
  stationId: number;
  monthly: WaterQualityRecord[];
}

export interface WqiComponent {
  name: string;
  value: number;
}

export interface AlertRecord {
  id: string;
  stationId: number;
  stationName: string;
  type: 'Warning' | 'Critical' | 'Info';
  parameter: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}