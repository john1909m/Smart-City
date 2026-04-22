import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReadingsState } from '../reducers/readings.reducer';

export const selectReadingsState = createFeatureSelector<ReadingsState>('readings');

export const selectLatestReadings = createSelector(selectReadingsState, (state) => state.latest);
export const selectReadingsLoading = createSelector(selectReadingsState, (state) => state.loading);
export const selectCo2Readings = createSelector(selectReadingsState, (state) => state.co2);
export const selectHumidityReadings = createSelector(selectReadingsState, (state) => state.humidity);
export const selectRainReadings = createSelector(selectReadingsState, (state) => state.rain);
