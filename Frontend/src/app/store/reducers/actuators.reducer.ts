import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Actuator } from '../../core/models/actuator.model';
import { ActuatorState } from '../../core/models/actuator-state.model';
import { ActuatorsActions } from '../actions/actuators.actions';

export interface ActuatorStateEntityState extends EntityState<Actuator> {
  statesByActuatorId: Record<string, ActuatorState>;
  loading: boolean;
  error: string | null;
}

export const actuatorsAdapter = createEntityAdapter<Actuator>();

export const initialActuatorsState: ActuatorStateEntityState = actuatorsAdapter.getInitialState({
  statesByActuatorId: {},
  loading: false,
  error: null,
});

export const actuatorsReducer = createReducer(
  initialActuatorsState,
  on(ActuatorsActions.loadActuators, (state) => ({ ...state, loading: true, error: null })),
  on(ActuatorsActions.loadActuatorsSuccess, (state, { actuators, states }) =>
    actuatorsAdapter.setAll(actuators, {
      ...state,
      loading: false,
      statesByActuatorId: states.reduce<Record<string, ActuatorState>>((acc, actuatorState) => {
        acc[actuatorState.actuatorId] = actuatorState;
        return acc;
      }, {}),
    }),
  ),
  on(ActuatorsActions.setActuatorStateSuccess, (state, { actuatorState }) => ({
    ...state,
    statesByActuatorId: { ...state.statesByActuatorId, [actuatorState.actuatorId]: actuatorState },
  })),
  on(ActuatorsActions.loadActuatorsFailure, ActuatorsActions.setActuatorStateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
