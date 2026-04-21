export type SensorType = 'humidity' | 'rain' | 'co2' | 'heartbeat' | 'rfid' | 'environmental';

export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  locationId: string;
  active: boolean;
  unit: string;
  lastValue?: number | string;
  lastUpdatedAt?: string;
}
