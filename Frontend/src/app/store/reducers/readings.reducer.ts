import { createReducer, on } from '@ngrx/store';
import { SensorReading } from '../../core/models/sensor-reading.model';
import { ReadingsActions } from '../actions/readings.actions';

export interface ReadingsState {
  latest: SensorReading[];
  bySensor: Record<string, SensorReading[]>;
  loading: boolean;
  error: string | null;
}

export const initialReadingsState: ReadingsState = {
  latest: [],
  bySensor: {},
  loading: false,
  error: null,
};

export const readingsReducer = createReducer(
  initialReadingsState,
  on(ReadingsActions.loadLatestReadings, ReadingsActions.loadReadingsBySensor, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReadingsActions.loadLatestReadingsSuccess, (state, { readings }) => ({ ...state, latest: readings, loading: false })),
  on(ReadingsActions.loadReadingsBySensorSuccess, (state, { sensorId, readings }) => ({
    ...state,
    bySensor: { ...state.bySensor, [sensorId]: readings },
    loading: false,
  })),
  on(ReadingsActions.loadLatestReadingsFailure, ReadingsActions.loadReadingsBySensorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
