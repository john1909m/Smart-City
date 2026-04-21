import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SensorsState } from '../reducers/sensors.reducer';

export const selectSensorsState = createFeatureSelector<SensorsState>('sensors');

export const selectSensors = createSelector(selectSensorsState, (state) => state.sensors);
export const selectSensorsLoading = createSelector(selectSensorsState, (state) => state.loading);
