import { createReducer, on } from '@ngrx/store';
import { SensorReading } from '../../core/models/sensor-reading.model';
import { ReadingsActions } from '../actions/readings.actions';

export interface ReadingsState {
  latest: SensorReading[];
  co2: SensorReading[];
  humidity: SensorReading[];
  rain: SensorReading[];
  loading: boolean;
  error: string | null;
}

export const initialReadingsState: ReadingsState = {
  latest: [],
  co2: [],
  humidity: [],
  rain: [],
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
  on(ReadingsActions.loadReadingsBySensorSuccess, (state, { sensorId, readings }) => {
    const key = sensorId === '2' ? 'co2' : sensorId === '3' ? 'humidity' : sensorId === '4' ? 'rain' : '';
    if (key) {
      return { ...state, [key]: readings, loading: false };
    }
    return { ...state, loading: false };
  }),
  on(ReadingsActions.loadLatestReadingsFailure, ReadingsActions.loadReadingsBySensorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
