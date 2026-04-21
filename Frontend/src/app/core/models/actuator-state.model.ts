export interface ActuatorState {
  actuatorId: string;
  status: 'on' | 'off' | 'open' | 'closed';
  updatedAt: string;
  source?: 'manual' | 'automation';
}
