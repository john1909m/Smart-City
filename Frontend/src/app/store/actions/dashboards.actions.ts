import { createActionGroup, props } from '@ngrx/store';
import { DashboardData } from '../../core/models/dashboard.model';

export const DashboardsActions = createActionGroup({
  source: 'Dashboards',
  events: {
    'Load Dashboard': props<{ location: string }>(),
    'Load Dashboard Success': props<{ location: string; dashboard: DashboardData }>(),
    'Load Dashboard Failure': props<{ error: string }>(),
  },
});
