import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, takeUntil, timer } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { SensorsActions } from '../actions/sensors.actions';

@Injectable()
export class SensorsEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(ApiService);

  loadSensors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SensorsActions.loadSensors),
      switchMap(({ location }) =>
        this.api.getSensors(location).pipe(
          map((sensors) => SensorsActions.loadSensorsSuccess({ sensors })),
          catchError((error) => of(SensorsActions.loadSensorsFailure({ error: this.stringifyError(error) }))),
        ),
      ),
    ),
  );

  startPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SensorsActions.startSensorsPolling),
      switchMap(({ location }) =>
        timer(0, 10000).pipe(
          map(() => SensorsActions.loadSensors({ location })),
          takeUntil(this.actions$.pipe(ofType(SensorsActions.stopSensorsPolling))),
        ),
      ),
    ),
  );

  private stringifyError(error: unknown): string {
    return error instanceof Error ? error.message : 'Unexpected error while loading sensors';
  }
}
