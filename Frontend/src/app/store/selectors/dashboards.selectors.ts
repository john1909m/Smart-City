import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../reducers/dashboards.reducer';

export const selectDashboardsState = createFeatureSelector<DashboardState>('dashboards');

export const selectDashboardLoading = createSelector(selectDashboardsState, (state) => state.loading);
export const selectDashboardByLocation = (location: string) =>
  createSelector(selectDashboardsState, (state) => state.entities[location]);
