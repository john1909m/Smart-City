export interface SensorReading {
  id: string;
  sensorId: string;
  timestamp: string;
  value: number;
  quality?: 'good' | 'warning' | 'critical';
}
