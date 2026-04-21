import { createFeatureSelector, createSelector } from '@ngrx/store';
import { actuatorsAdapter, ActuatorStateEntityState } from '../reducers/actuators.reducer';

export const selectActuatorsState = createFeatureSelector<ActuatorStateEntityState>('actuators');
const adapterSelectors = actuatorsAdapter.getSelectors(selectActuatorsState);

export const selectAllActuators = adapterSelectors.selectAll;
export const selectActuatorStates = createSelector(selectActuatorsState, (state) => state.statesByActuatorId);
export const selectActuatorsLoading = createSelector(selectActuatorsState, (state) => state.loading);
