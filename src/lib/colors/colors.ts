export interface TailwindStatusColor {
  bg: string;
  text: string;
}

export type WQIValue = number;

export const getWqiStatusColor = (wqi: WQIValue): TailwindStatusColor => {
  if (wqi >= 80) return {
    bg: 'bg-status-normal',
    text: 'text-status-normal',
  };
  if (wqi >= 70) return {
    bg: 'bg-status-normal',
    text: 'text-status-normal',
  };
  if (wqi >= 60) return {
    bg: 'bg-status-warning',
    text: 'text-status-warning',
  };
  return {
    bg: 'bg-status-critical',
    text: 'text-status-critical',
  };
};

// Map of CSS variable names to use in style objects
export const PieChartColor: Record<string, string> = {
  'pH': 'hsl(var(--chart-1))',
  'Dissolved Oxygen': 'hsl(var(--chart-2))',
  'Turbidity': 'hsl(var(--chart-3))',
  'Temperature': 'hsl(var(--chart-4))',
};
