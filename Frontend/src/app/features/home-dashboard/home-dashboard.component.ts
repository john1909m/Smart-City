import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActuatorState } from '../../core/models/actuator-state.model';
import { ActuatorsActions } from '../../store/actions/actuators.actions';
import { ReadingsActions } from '../../store/actions/readings.actions';
import { SensorsActions } from '../../store/actions/sensors.actions';
import { selectActuatorStates } from '../../store/selectors/actuators.selectors';
import { selectLatestReadings } from '../../store/selectors/readings.selectors';
import { selectSensors } from '../../store/selectors/sensors.selectors';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class HomeDashboardComponent implements OnInit {
  readonly sensors$;
  readonly readings$;
  readonly actuatorStates$;

  constructor(private readonly store: Store) {
    this.sensors$ = this.store.select(selectSensors);
    this.readings$ = this.store.select(selectLatestReadings);
    this.actuatorStates$ = this.store.select(selectActuatorStates);
  }

  ngOnInit(): void {
    this.store.dispatch(SensorsActions.loadSensors({ location: 'home' }));
    this.store.dispatch(ReadingsActions.loadLatestReadings({ location: 'home' }));
    this.store.dispatch(ActuatorsActions.loadActuators({ location: 'home' }));
  }

  onLedChange(actuatorId: string, checked: boolean): void {
    const status: ActuatorState['status'] = checked ? 'on' : 'off';
    this.store.dispatch(ActuatorsActions.setActuatorState({ actuatorId, status }));
  }
}
