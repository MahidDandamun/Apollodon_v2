import { WaterQualityRecord, StationRecord, WqiComponent, AlertRecord } from '@/components/types/WaterQuality';

// 1. Aggregate Historical Data (Used when no station is selected)
export const waterQualityData: WaterQualityRecord[] = [
  { name: 'Mar 25', ph: 7.3, dissolved_oxygen: 8.5, turbidity: 5.0, temperature: 17, wqi: 84, predicted_wqi: 83, predicted_ph: 7.2 },
  { name: 'Apr 25', ph: 7.0, dissolved_oxygen: 8.0, turbidity: 5.8, temperature: 18, wqi: 78, predicted_wqi: 76, predicted_ph: 6.9 },
  { name: 'May 25', ph: 6.9, dissolved_oxygen: 7.8, turbidity: 6.0, temperature: 19, wqi: 76, predicted_wqi: 74, predicted_ph: 6.8 },
  { name: 'Jun 25', ph: 7.2, dissolved_oxygen: 7.5, turbidity: 6.2, temperature: 21, wqi: 79, predicted_wqi: 77, predicted_ph: 7.0 },
  { name: 'Jul 25', ph: 7.4, dissolved_oxygen: 7.2, turbidity: 6.5, temperature: 23, wqi: 75, predicted_wqi: 74, predicted_ph: 7.3 },
  { name: 'Aug 25', ph: 7.5, dissolved_oxygen: 7.0, turbidity: 6.8, temperature: 24, wqi: 72, predicted_wqi: 71, predicted_ph: 7.4 },
  { name: 'Sep 25', ph: 7.3, dissolved_oxygen: 7.6, turbidity: 5.9, temperature: 21, wqi: 77, predicted_wqi: 75, predicted_ph: 7.2 },
  { name: 'Oct 25', ph: 7.1, dissolved_oxygen: 8.1, turbidity: 5.4, temperature: 18, wqi: 81, predicted_wqi: 80, predicted_ph: 7.0 },
  { name: 'Nov 25', ph: 7.2, dissolved_oxygen: 8.5, turbidity: 5.1, temperature: 15, wqi: 83, predicted_wqi: 82, predicted_ph: 7.1 },
  { name: 'Dec 25', ph: 7.3, dissolved_oxygen: 8.7, turbidity: 4.8, temperature: 14, wqi: 85, predicted_wqi: 86, predicted_ph: 7.2 },
  { name: 'Jan 26', ph: 7.2, dissolved_oxygen: 8.4, turbidity: 5.2, temperature: 16, wqi: 82, predicted_wqi: 81, predicted_ph: 7.1 },
  { name: 'Feb 26', ph: 7.1, dissolved_oxygen: 8.2, turbidity: 5.5, temperature: 16.5, wqi: 80, predicted_wqi: 78, predicted_ph: 7.0 },
  { name: 'Mar 26', ph: 7.4, dissolved_oxygen: 8.6, turbidity: 4.9, temperature: 16, wqi: 76, predicted_wqi: 85, predicted_ph: 7.3 },
];

// Per-Station Historical Data (Mar 2025 -> Mar 2026)
export const stationHistoricalData: Record<number, WaterQualityRecord[]> = {
  1: [ // Napindan (C6) - Stable
    { name: 'Mar 25', ph: 7.4, dissolved_oxygen: 8.2, turbidity: 5.1, temperature: 17, wqi: 83, predicted_wqi: 83, predicted_ph: 7.4 },
    { name: 'Apr 25', ph: 7.3, dissolved_oxygen: 8.0, turbidity: 5.2, temperature: 18, wqi: 81, predicted_wqi: 80, predicted_ph: 7.3 },
    { name: 'May 25', ph: 7.2, dissolved_oxygen: 7.8, turbidity: 5.4, temperature: 19, wqi: 79, predicted_wqi: 79, predicted_ph: 7.2 },
    { name: 'Jun 25', ph: 7.1, dissolved_oxygen: 7.7, turbidity: 5.5, temperature: 21, wqi: 78, predicted_wqi: 78, predicted_ph: 7.1 },
    { name: 'Jul 25', ph: 7.2, dissolved_oxygen: 7.5, turbidity: 5.8, temperature: 23, wqi: 75, predicted_wqi: 76, predicted_ph: 7.2 },
    { name: 'Aug 25', ph: 7.3, dissolved_oxygen: 7.6, turbidity: 5.7, temperature: 24, wqi: 76, predicted_wqi: 76, predicted_ph: 7.3 },
    { name: 'Sep 25', ph: 7.4, dissolved_oxygen: 7.8, turbidity: 5.3, temperature: 21, wqi: 79, predicted_wqi: 78, predicted_ph: 7.4 },
    { name: 'Oct 25', ph: 7.5, dissolved_oxygen: 8.1, turbidity: 5.1, temperature: 18, wqi: 82, predicted_wqi: 81, predicted_ph: 7.4 },
    { name: 'Nov 25', ph: 7.4, dissolved_oxygen: 8.3, turbidity: 5.0, temperature: 15, wqi: 84, predicted_wqi: 83, predicted_ph: 7.4 },
    { name: 'Dec 25', ph: 7.5, dissolved_oxygen: 8.5, turbidity: 4.9, temperature: 14, wqi: 86, predicted_wqi: 85, predicted_ph: 7.4 },
    { name: 'Jan 26', ph: 7.4, dissolved_oxygen: 8.4, turbidity: 4.8, temperature: 16, wqi: 85, predicted_wqi: 84, predicted_ph: 7.4 },
    { name: 'Feb 26', ph: 7.3, dissolved_oxygen: 8.2, turbidity: 4.9, temperature: 16.5, wqi: 82, predicted_wqi: 83, predicted_ph: 7.3 },
    { name: 'Mar 26', ph: 7.4, dissolved_oxygen: 8.4, turbidity: 5.0, temperature: 16, wqi: 83, predicted_wqi: 84, predicted_ph: 7.4 },
  ],
  2: [ // Bambang - Declining
    { name: 'Mar 25', ph: 7.2, dissolved_oxygen: 7.5, turbidity: 6.5, temperature: 17, wqi: 72, predicted_wqi: 71, predicted_ph: 7.1 },
    { name: 'Apr 25', ph: 7.1, dissolved_oxygen: 7.2, turbidity: 6.8, temperature: 18, wqi: 69, predicted_wqi: 68, predicted_ph: 7.1 },
    { name: 'May 25', ph: 7.0, dissolved_oxygen: 6.9, turbidity: 7.2, temperature: 19, wqi: 65, predicted_wqi: 64, predicted_ph: 7.0 },
    { name: 'Jun 25', ph: 6.9, dissolved_oxygen: 6.5, turbidity: 7.8, temperature: 21, wqi: 61, predicted_wqi: 60, predicted_ph: 6.8 },
    { name: 'Jul 25', ph: 6.8, dissolved_oxygen: 6.2, turbidity: 8.5, temperature: 23, wqi: 58, predicted_wqi: 59, predicted_ph: 6.8 },
    { name: 'Aug 25', ph: 6.9, dissolved_oxygen: 6.3, turbidity: 8.2, temperature: 24, wqi: 60, predicted_wqi: 61, predicted_ph: 6.9 },
    { name: 'Sep 25', ph: 7.0, dissolved_oxygen: 6.6, turbidity: 7.5, temperature: 21, wqi: 64, predicted_wqi: 65, predicted_ph: 7.0 },
    { name: 'Oct 25', ph: 7.1, dissolved_oxygen: 7.0, turbidity: 6.9, temperature: 18, wqi: 68, predicted_wqi: 67, predicted_ph: 7.1 },
    { name: 'Nov 25', ph: 7.0, dissolved_oxygen: 7.1, turbidity: 6.7, temperature: 15, wqi: 69, predicted_wqi: 70, predicted_ph: 7.0 },
    { name: 'Dec 25', ph: 6.9, dissolved_oxygen: 6.9, turbidity: 7.0, temperature: 14, wqi: 66, predicted_wqi: 65, predicted_ph: 6.9 },
    { name: 'Jan 26', ph: 6.8, dissolved_oxygen: 6.8, turbidity: 7.2, temperature: 16, wqi: 64, predicted_wqi: 64, predicted_ph: 6.8 },
    { name: 'Feb 26', ph: 6.9, dissolved_oxygen: 6.9, turbidity: 7.0, temperature: 16.5, wqi: 65, predicted_wqi: 66, predicted_ph: 6.9 },
    { name: 'Mar 26', ph: 7.0, dissolved_oxygen: 7.1, turbidity: 6.8, temperature: 16, wqi: 68, predicted_wqi: 69, predicted_ph: 7.0 },
  ],
  3: [ // Guadalupe Ferry - Improving
    { name: 'Mar 25', ph: 7.4, dissolved_oxygen: 8.2, turbidity: 5.5, temperature: 17, wqi: 82, predicted_wqi: 83, predicted_ph: 7.4 },
    { name: 'Apr 25', ph: 7.5, dissolved_oxygen: 8.4, turbidity: 5.2, temperature: 18, wqi: 84, predicted_wqi: 85, predicted_ph: 7.5 },
    { name: 'May 25', ph: 7.5, dissolved_oxygen: 8.5, turbidity: 5.0, temperature: 19, wqi: 86, predicted_wqi: 87, predicted_ph: 7.5 },
    { name: 'Jun 25', ph: 7.4, dissolved_oxygen: 8.4, turbidity: 5.1, temperature: 21, wqi: 85, predicted_wqi: 85, predicted_ph: 7.4 },
    { name: 'Jul 25', ph: 7.5, dissolved_oxygen: 8.6, turbidity: 4.8, temperature: 23, wqi: 87, predicted_wqi: 88, predicted_ph: 7.5 },
    { name: 'Aug 25', ph: 7.6, dissolved_oxygen: 8.8, turbidity: 4.5, temperature: 24, wqi: 89, predicted_wqi: 90, predicted_ph: 7.6 },
    { name: 'Sep 25', ph: 7.5, dissolved_oxygen: 8.7, turbidity: 4.6, temperature: 21, wqi: 88, predicted_wqi: 87, predicted_ph: 7.5 },
    { name: 'Oct 25', ph: 7.6, dissolved_oxygen: 8.9, turbidity: 4.2, temperature: 18, wqi: 91, predicted_wqi: 92, predicted_ph: 7.6 },
    { name: 'Nov 25', ph: 7.6, dissolved_oxygen: 9.0, turbidity: 4.0, temperature: 15, wqi: 92, predicted_wqi: 93, predicted_ph: 7.6 },
    { name: 'Dec 25', ph: 7.5, dissolved_oxygen: 8.8, turbidity: 4.3, temperature: 14, wqi: 90, predicted_wqi: 89, predicted_ph: 7.5 },
    { name: 'Jan 26', ph: 7.4, dissolved_oxygen: 8.6, turbidity: 4.5, temperature: 16, wqi: 87, predicted_wqi: 88, predicted_ph: 7.4 },
    { name: 'Feb 26', ph: 7.5, dissolved_oxygen: 8.7, turbidity: 4.4, temperature: 16.5, wqi: 88, predicted_wqi: 89, predicted_ph: 7.5 },
    { name: 'Mar 26', ph: 7.6, dissolved_oxygen: 8.8, turbidity: 4.2, temperature: 16, wqi: 89, predicted_wqi: 90, predicted_ph: 7.6 },
  ],
  4: [ // Lambingan - Critical
    { name: 'Mar 25', ph: 6.9, dissolved_oxygen: 6.5, turbidity: 7.5, temperature: 17, wqi: 62, predicted_wqi: 60, predicted_ph: 6.8 },
    { name: 'Apr 25', ph: 6.8, dissolved_oxygen: 6.1, turbidity: 7.9, temperature: 18, wqi: 58, predicted_wqi: 55, predicted_ph: 6.7 },
    { name: 'May 25', ph: 6.7, dissolved_oxygen: 5.5, turbidity: 8.5, temperature: 19, wqi: 52, predicted_wqi: 50, predicted_ph: 6.6 },
    { name: 'Jun 25', ph: 6.5, dissolved_oxygen: 4.8, turbidity: 9.2, temperature: 21, wqi: 45, predicted_wqi: 44, predicted_ph: 6.5 },
    { name: 'Jul 25', ph: 6.6, dissolved_oxygen: 5.0, turbidity: 8.8, temperature: 23, wqi: 48, predicted_wqi: 49, predicted_ph: 6.6 },
    { name: 'Aug 25', ph: 6.7, dissolved_oxygen: 5.2, turbidity: 8.5, temperature: 24, wqi: 50, predicted_wqi: 51, predicted_ph: 6.7 },
    { name: 'Sep 25', ph: 6.6, dissolved_oxygen: 5.1, turbidity: 8.6, temperature: 21, wqi: 49, predicted_wqi: 48, predicted_ph: 6.6 },
    { name: 'Oct 25', ph: 6.5, dissolved_oxygen: 4.9, turbidity: 9.0, temperature: 18, wqi: 46, predicted_wqi: 45, predicted_ph: 6.5 },
    { name: 'Nov 25', ph: 6.6, dissolved_oxygen: 5.3, turbidity: 8.4, temperature: 15, wqi: 51, predicted_wqi: 52, predicted_ph: 6.6 },
    { name: 'Dec 25', ph: 6.7, dissolved_oxygen: 5.6, turbidity: 8.0, temperature: 14, wqi: 54, predicted_wqi: 55, predicted_ph: 6.7 },
    { name: 'Jan 26', ph: 6.6, dissolved_oxygen: 5.4, turbidity: 8.2, temperature: 16, wqi: 52, predicted_wqi: 53, predicted_ph: 6.6 },
    { name: 'Feb 26', ph: 6.7, dissolved_oxygen: 5.7, turbidity: 7.9, temperature: 16.5, wqi: 55, predicted_wqi: 54, predicted_ph: 6.7 },
    { name: 'Mar 26', ph: 6.7, dissolved_oxygen: 5.7, turbidity: 7.9, temperature: 16, wqi: 55, predicted_wqi: 56, predicted_ph: 6.7 },
  ],
  5: [ // Nagtahan - Fluctuating
    { name: 'Mar 25', ph: 7.0, dissolved_oxygen: 7.1, turbidity: 6.8, temperature: 17, wqi: 68, predicted_wqi: 67, predicted_ph: 7.0 },
    { name: 'Apr 25', ph: 6.8, dissolved_oxygen: 6.7, turbidity: 7.5, temperature: 18, wqi: 63, predicted_wqi: 62, predicted_ph: 6.8 },
    { name: 'May 25', ph: 7.1, dissolved_oxygen: 7.2, turbidity: 6.5, temperature: 19, wqi: 69, predicted_wqi: 68, predicted_ph: 7.0 },
    { name: 'Jun 25', ph: 6.7, dissolved_oxygen: 6.5, turbidity: 8.0, temperature: 21, wqi: 59, predicted_wqi: 58, predicted_ph: 6.7 },
    { name: 'Jul 25', ph: 6.9, dissolved_oxygen: 6.8, turbidity: 7.2, temperature: 23, wqi: 65, predicted_wqi: 64, predicted_ph: 6.9 },
    { name: 'Aug 25', ph: 6.8, dissolved_oxygen: 6.6, turbidity: 7.8, temperature: 24, wqi: 61, predicted_wqi: 60, predicted_ph: 6.8 },
    { name: 'Sep 25', ph: 7.0, dissolved_oxygen: 7.0, turbidity: 7.0, temperature: 21, wqi: 67, predicted_wqi: 66, predicted_ph: 7.0 },
    { name: 'Oct 25', ph: 6.7, dissolved_oxygen: 6.4, turbidity: 8.2, temperature: 18, wqi: 57, predicted_wqi: 56, predicted_ph: 6.7 },
    { name: 'Nov 25', ph: 6.9, dissolved_oxygen: 6.9, turbidity: 7.4, temperature: 15, wqi: 64, predicted_wqi: 65, predicted_ph: 6.9 },
    { name: 'Dec 25', ph: 7.1, dissolved_oxygen: 7.3, turbidity: 6.5, temperature: 14, wqi: 70, predicted_wqi: 69, predicted_ph: 7.1 },
    { name: 'Jan 26', ph: 6.8, dissolved_oxygen: 6.7, turbidity: 7.6, temperature: 16, wqi: 62, predicted_wqi: 63, predicted_ph: 6.8 },
    { name: 'Feb 26', ph: 6.7, dissolved_oxygen: 6.5, turbidity: 7.9, temperature: 16.5, wqi: 59, predicted_wqi: 58, predicted_ph: 6.7 },
    { name: 'Mar 26', ph: 6.9, dissolved_oxygen: 6.8, turbidity: 7.2, temperature: 16, wqi: 62, predicted_wqi: 63, predicted_ph: 6.9 },
  ],
  6: [ // Jones - Moderate Recovery
    { name: 'Mar 25', ph: 7.1, dissolved_oxygen: 7.5, turbidity: 6.2, temperature: 17, wqi: 72, predicted_wqi: 71, predicted_ph: 7.1 },
    { name: 'Apr 25', ph: 7.0, dissolved_oxygen: 7.2, turbidity: 6.5, temperature: 18, wqi: 70, predicted_wqi: 69, predicted_ph: 7.0 },
    { name: 'May 25', ph: 7.1, dissolved_oxygen: 7.4, turbidity: 6.3, temperature: 19, wqi: 71, predicted_wqi: 70, predicted_ph: 7.1 },
    { name: 'Jun 25', ph: 7.2, dissolved_oxygen: 7.6, turbidity: 6.0, temperature: 21, wqi: 74, predicted_wqi: 73, predicted_ph: 7.2 },
    { name: 'Jul 25', ph: 7.1, dissolved_oxygen: 7.3, turbidity: 6.4, temperature: 23, wqi: 71, predicted_wqi: 72, predicted_ph: 7.1 },
    { name: 'Aug 25', ph: 7.0, dissolved_oxygen: 7.1, turbidity: 6.7, temperature: 24, wqi: 69, predicted_wqi: 68, predicted_ph: 7.0 },
    { name: 'Sep 25', ph: 7.2, dissolved_oxygen: 7.5, turbidity: 6.1, temperature: 21, wqi: 73, predicted_wqi: 74, predicted_ph: 7.2 },
    { name: 'Oct 25', ph: 7.3, dissolved_oxygen: 7.8, turbidity: 5.8, temperature: 18, wqi: 76, predicted_wqi: 75, predicted_ph: 7.3 },
    { name: 'Nov 25', ph: 7.4, dissolved_oxygen: 8.0, turbidity: 5.5, temperature: 15, wqi: 79, predicted_wqi: 80, predicted_ph: 7.4 },
    { name: 'Dec 25', ph: 7.3, dissolved_oxygen: 7.9, turbidity: 5.7, temperature: 14, wqi: 77, predicted_wqi: 78, predicted_ph: 7.3 },
    { name: 'Jan 26', ph: 7.4, dissolved_oxygen: 8.1, turbidity: 5.4, temperature: 16, wqi: 80, predicted_wqi: 79, predicted_ph: 7.4 },
    { name: 'Feb 26', ph: 7.3, dissolved_oxygen: 7.8, turbidity: 5.7, temperature: 16.5, wqi: 76, predicted_wqi: 77, predicted_ph: 7.3 },
    { name: 'Mar 26', ph: 7.4, dissolved_oxygen: 7.9, turbidity: 5.6, temperature: 16, wqi: 75, predicted_wqi: 76, predicted_ph: 7.4 },
  ],
};


// 4. Station Information - 6 Pasig Monitoring Stations
export const stationData: StationRecord[] = [
  { id: 1, name: 'Napindan (C6)', location: 'Pasig River', coordinates: { lat: 14.5350, lng: 121.1025 }, status: 'Normal', lastReading: '10min ago', wqi: 83, trend: 'stable', trendDelta: 0.5, priority: 'Low', ph: 7.4, dissolved_oxygen: 8.4, turbidity: 5.0, temperature: 16 },
  { id: 2, name: 'Bambang', location: 'Pasig River', coordinates: { lat: 14.5536, lng: 121.0759 }, status: 'Warning', lastReading: '25min ago', wqi: 68, trend: 'down', trendDelta: -4.2, priority: 'Medium', ph: 7.0, dissolved_oxygen: 7.1, turbidity: 6.8, temperature: 16 },
  { id: 3, name: 'Guadalupe Ferry', location: 'Pasig River', coordinates: { lat: 14.568472, lng: 121.046000 }, status: 'Normal', lastReading: '5min ago', wqi: 89, trend: 'up', trendDelta: 2.1, priority: 'Low', ph: 7.6, dissolved_oxygen: 8.8, turbidity: 4.2, temperature: 16 },
  { id: 4, name: 'Lambingan', location: 'Pasig River', coordinates: { lat: 14.586389, lng: 121.019722 }, status: 'Critical', lastReading: '1hr ago', wqi: 55, trend: 'down', trendDelta: -8.5, priority: 'High', ph: 6.7, dissolved_oxygen: 5.7, turbidity: 7.9, temperature: 16 },
  { id: 5, name: 'Nagtahan', location: 'Pasig River', coordinates: { lat: 14.5958, lng: 121.0014 }, status: 'Warning', lastReading: '15min ago', wqi: 62, trend: 'stable', trendDelta: -1.2, priority: 'Medium', ph: 6.9, dissolved_oxygen: 6.8, turbidity: 7.2, temperature: 16 },
  { id: 6, name: 'Jones', location: 'Pasig River', coordinates: { lat: 14.5958, lng: 120.9773 }, status: 'Normal', lastReading: '8min ago', wqi: 75, trend: 'up', trendDelta: 3.5, priority: 'Low', ph: 7.4, dissolved_oxygen: 7.9, turbidity: 5.6, temperature: 16 },
];

// 5. WQI Weighting Components
export const wqiComponents: WqiComponent[] = [
  { name: 'pH', value: 25 },
  { name: 'Dissolved Oxygen', value: 35 },
  { name: 'Turbidity', value: 20 },
  { name: 'Temperature', value: 20 },
];

// 6. Alert Feed Data
export const alertsData: AlertRecord[] = [
  {
    id: 'ALT-1042',
    stationId: 4,
    stationName: 'Lambingan',
    type: 'Critical',
    parameter: 'Turbidity',
    message: 'Turbidity exceeded 8.0 NTU for 3 consecutive readings. Potential sediment runoff.',
    timestamp: 'Today, 09:42 AM',
    acknowledged: false,
  },
  {
    id: 'ALT-1041',
    stationId: 2,
    stationName: 'Bambang',
    type: 'Warning',
    parameter: 'WQI',
    message: 'WQI dropped below acceptable threshold (68/100). Dissolved oxygen levels are falling.',
    timestamp: 'Today, 08:15 AM',
    acknowledged: false,
  },
  {
    id: 'ALT-1040',
    stationId: 5,
    stationName: 'Nagtahan',
    type: 'Warning',
    parameter: 'pH',
    message: 'pH levels fluctuated by 1.5 within a 2-hour window. Monitoring closely.',
    timestamp: 'Yesterday, 04:30 PM',
    acknowledged: false,
  },
  {
    id: 'ALT-1039',
    stationId: 1,
    stationName: 'Napindan (C6)',
    type: 'Info',
    parameter: 'System',
    message: 'Routine calibration completed successfully. All sensors nominal.',
    timestamp: 'Yesterday, 11:23 PM',
    acknowledged: true,
  },
];

export const getWqiLabel = (wqi: number): string => {
  if (wqi >= 80) return 'Excellent';
  if (wqi >= 70) return 'Good';
  if (wqi >= 60) return 'Fair';
  return 'Poor';
};