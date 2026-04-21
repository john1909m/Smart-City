export type ActuatorType = 'led' | 'door';

export interface Actuator {
  id: string;
  name: string;
  type: ActuatorType;
  locationId: string;
  active: boolean;
}
