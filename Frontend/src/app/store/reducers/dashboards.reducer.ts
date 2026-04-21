import { createReducer, on } from '@ngrx/store';
import { DashboardData } from '../../core/models/dashboard.model';
import { DashboardsActions } from '../actions/dashboards.actions';

export interface DashboardState {
  entities: Record<string, DashboardData>;
  loading: boolean;
  error: string | null;
}

export const initialDashboardState: DashboardState = {
  entities: {},
  loading: false,
  error: null,
};

export const dashboardsReducer = createReducer(
  initialDashboardState,
  on(DashboardsActions.loadDashboard, (state) => ({ ...state, loading: true, error: null })),
  on(DashboardsActions.loadDashboardSuccess, (state, { location, dashboard }) => ({
    ...state,
    loading: false,
    entities: { ...state.entities, [location]: dashboard },
  })),
  on(DashboardsActions.loadDashboardFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
