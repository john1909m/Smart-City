import { createReducer, on } from '@ngrx/store';
import { Sensor } from '../../core/models/sensor.model';
import { SensorsActions } from '../actions/sensors.actions';

export interface SensorsState {
  sensors: Sensor[];
  loading: boolean;
  error: string | null;
}

export const initialSensorsState: SensorsState = {
  sensors: [],
  loading: false,
  error: null,
};

export const sensorsReducer = createReducer(
  initialSensorsState,
  on(SensorsActions.loadSensors, (state) => ({ ...state, loading: true, error: null })),
  on(SensorsActions.loadSensorsSuccess, (state, { sensors }) => ({ ...state, sensors, loading: false })),
  on(SensorsActions.loadSensorsFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
