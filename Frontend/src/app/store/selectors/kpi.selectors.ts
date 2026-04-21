import { createSelector } from '@ngrx/store';
import { selectActuatorStates } from './actuators.selectors';
import { selectDashboardByLocation } from './dashboards.selectors';
import { selectSensors } from './sensors.selectors';

export const selectGlobalSummary = createSelector(
  selectSensors,
  selectActuatorStates,
  selectDashboardByLocation('all'),
  (sensors, actuatorStates, dashboard) => ({
    totalSensors: sensors.length || dashboard?.summary.totalSensors || 0,
    activeDevices:
      Object.values(actuatorStates).filter((state) => state.status === 'on' || state.status === 'open').length ||
      dashboard?.summary.activeDevices ||
      0,
    alerts: dashboard?.summary.alerts || 0,
  }),
);
