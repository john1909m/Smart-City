import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { ActuatorsActions } from '../actions/actuators.actions';

@Injectable()
export class ActuatorsEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(ApiService);

  loadActuators$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActuatorsActions.loadActuators),
      switchMap(({ location }) =>
        this.api.getActuators(location).pipe(
          switchMap((actuators) =>
            this.api.getActuatorStates(location).pipe(
              map((states) => ActuatorsActions.loadActuatorsSuccess({ actuators, states })),
            ),
          ),
          catchError((error) => of(ActuatorsActions.loadActuatorsFailure({ error: this.stringifyError(error) }))),
        ),
      ),
    ),
  );

  setActuatorState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActuatorsActions.setActuatorState),
      switchMap(({ actuatorId, status }) =>
        this.api.setActuatorState(actuatorId, status).pipe(
          map((actuatorState) => ActuatorsActions.setActuatorStateSuccess({ actuatorState })),
          catchError((error) => of(ActuatorsActions.setActuatorStateFailure({ error: this.stringifyError(error) }))),
        ),
      ),
    ),
  );

  private stringifyError(error: unknown): string {
    return error instanceof Error ? error.message : 'Unexpected error while updating actuator';
  }
}
