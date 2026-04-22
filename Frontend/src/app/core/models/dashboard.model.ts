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

export interface RfidEntry {
  cardId: string;
  status: string;
  type: string;
}
