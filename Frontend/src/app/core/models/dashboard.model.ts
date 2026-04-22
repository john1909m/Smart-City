import { SensorReading } from './sensor-reading.model';

export interface SensorCategory {
  sensorId: number;
  key: 'co2' | 'humidity' | 'rain';
  label: string;
}

export interface SensorCategorySeries {
  category: SensorCategory;
  readings: SensorReading[];
}

/** Matches backend `RfidLogsResponse` (GET /api/rfid/{sensorId}). */
export interface RfidEntry {
  id: number;
  cardId: string;
  status: string;
  timestamp: string;
  /** Optional: not returned by the API; filled client-side for display. */
  type?: string;
}
