import { SensorReading } from './sensor-reading.model';

export interface DashboardSummary {
  totalSensors: number;
  activeDevices: number;
  alerts: number;
}

export interface DashboardData {
  location: string;
  summary: DashboardSummary;
  latestReadings: SensorReading[];
}
