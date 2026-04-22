/** Matches backend `SensorReadingResponse` (GET /api/readings/{sensorId}). */
export interface SensorReading {
  id: number;
  value: number;
  timestamp: string;
  sensorType: string;
  quality?: 'good' | 'warning' | 'critical';
}
