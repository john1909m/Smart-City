import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { ReadingsActions } from '../actions/readings.actions';

@Injectable()
export class ReadingsEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(ApiService);

  loadLatestReadings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingsActions.loadLatestReadings),
      switchMap(({ location }) =>
        this.api.getLatestReadings(location).pipe(
          map((readings) => ReadingsActions.loadLatestReadingsSuccess({ readings })),
          catchError((error) => of(ReadingsActions.loadLatestReadingsFailure({ error: this.stringifyError(error) }))),
        ),
      ),
    ),
  );

  loadReadingsBySensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingsActions.loadReadingsBySensor),
      switchMap(({ sensorId }) =>
        this.api.getReadingsBySensorId(sensorId).pipe(
          map((readings) => ReadingsActions.loadReadingsBySensorSuccess({ sensorId, readings })),
          catchError((error) => of(ReadingsActions.loadReadingsBySensorFailure({ error: this.stringifyError(error) }))),
        ),
      ),
    ),
  );

  private stringifyError(error: unknown): string {
    return error instanceof Error ? error.message : 'Unexpected error while loading readings';
  }
}

