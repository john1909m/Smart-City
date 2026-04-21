import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Sensor } from '../../core/models/sensor.model';

export const SensorsActions = createActionGroup({
  source: 'Sensors',
  events: {
    'Load Sensors': props<{ location?: string }>(),
    'Load Sensors Success': props<{ sensors: Sensor[] }>(),
    'Load Sensors Failure': props<{ error: string }>(),
    'Start Sensors Polling': props<{ location?: string }>(),
    'Stop Sensors Polling': emptyProps(),
  },
});
