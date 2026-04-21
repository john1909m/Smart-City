import { createActionGroup, props } from '@ngrx/store';
import { Actuator } from '../../core/models/actuator.model';
import { ActuatorState } from '../../core/models/actuator-state.model';

export const ActuatorsActions = createActionGroup({
  source: 'Actuators',
  events: {
    'Load Actuators': props<{ location?: string }>(),
    'Load Actuators Success': props<{ actuators: Actuator[]; states: ActuatorState[] }>(),
    'Load Actuators Failure': props<{ error: string }>(),
    'Set Actuator State': props<{ actuatorId: string; status: ActuatorState['status'] }>(),
    'Set Actuator State Success': props<{ actuatorState: ActuatorState }>(),
    'Set Actuator State Failure': props<{ error: string }>(),
  },
});
