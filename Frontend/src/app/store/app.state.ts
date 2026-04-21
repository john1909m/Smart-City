import { ActuatorStateEntityState } from './reducers/actuators.reducer';
import { DashboardState } from './reducers/dashboards.reducer';
import { ReadingsState } from './reducers/readings.reducer';
import { SensorsState } from './reducers/sensors.reducer';

export interface AppState {
  sensors: SensorsState;
  readings: ReadingsState;
  actuators: ActuatorStateEntityState;
  dashboards: DashboardState;
}
