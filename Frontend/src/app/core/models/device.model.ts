export type DeviceCategory = 'sensor' | 'actuator';

export interface Device {
  id: string;
  name: string;
  category: DeviceCategory;
  locationId: string;
  online: boolean;
}
