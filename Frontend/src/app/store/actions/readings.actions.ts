import { createActionGroup, props } from '@ngrx/store';
import { SensorReading } from '../../core/models/sensor-reading.model';

export const ReadingsActions = createActionGroup({
  source: 'Readings',
  events: {
    'Load Latest Readings': props<{ location?: string }>(),
    'Load Latest Readings Success': props<{ readings: SensorReading[] }>(),
    'Load Latest Readings Failure': props<{ error: string }>(),
    'Load Readings By Sensor': props<{ sensorId: string }>(),
    'Load Readings By Sensor Success': props<{ sensorId: string; readings: SensorReading[] }>(),
    'Load Readings By Sensor Failure': props<{ error: string }>(),
  },
});
