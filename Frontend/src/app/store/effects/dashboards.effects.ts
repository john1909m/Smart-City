import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { DashboardsActions } from '../actions/dashboards.actions';

@Injectable()
export class DashboardsEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(ApiService);

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardsActions.loadDashboard),
      switchMap(({ location }) =>
        this.api.getDashboard(location).pipe(
          map((dashboard) => DashboardsActions.loadDashboardSuccess({ location, dashboard })),
          catchError((error) => of(DashboardsActions.loadDashboardFailure({ error: this.stringifyError(error) }))),
        ),
      ),
    ),
  );

  private stringifyError(error: unknown): string {
    return error instanceof Error ? error.message : 'Unexpected error while loading dashboard';
  }
}
