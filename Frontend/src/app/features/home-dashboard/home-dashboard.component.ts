import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { Store } from '@ngrx/store';
import { ActuatorState } from '../../core/models/actuator-state.model';
import { RfidEntry } from '../../core/models/dashboard.model';
import { ActuatorsActions } from '../../store/actions/actuators.actions';
import { ReadingsActions } from '../../store/actions/readings.actions';
import { SensorsActions } from '../../store/actions/sensors.actions';
import { selectActuatorStates } from '../../store/selectors/actuators.selectors';
import { selectCo2Readings, selectHumidityReadings, selectRainReadings } from '../../store/selectors/readings.selectors';
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
  readonly actuatorStates$;
  readonly co2Readings$: Observable<any[]>;
  readonly humidityReadings$: Observable<any[]>;
  readonly rainReadings$: Observable<any[]>;
  readonly rfidLogs$: Observable<RfidEntry[]>;

  readonly co2Latest$: Observable<any>;
  readonly humidityLatest$: Observable<any>;
  readonly rainLatest$: Observable<any>;

  constructor(
    private readonly store: Store,
    private readonly api: ApiService,
  ) {
    this.sensors$ = this.store.select(selectSensors);
    this.actuatorStates$ = this.store.select(selectActuatorStates);
    this.co2Readings$ = this.store.select(selectCo2Readings);
    this.humidityReadings$ = this.store.select(selectHumidityReadings);
    this.rainReadings$ = this.store.select(selectRainReadings);
    this.rfidLogs$ = this.api.getRfidLogs(5);
    this.co2Latest$ = this.store.select(selectCo2Readings).pipe(map(readings => readings[readings.length - 1]));
    this.humidityLatest$ = this.store.select(selectHumidityReadings).pipe(map(readings => readings[readings.length - 1]));
    this.rainLatest$ = this.store.select(selectRainReadings).pipe(map(readings => readings[readings.length - 1]));
  }

  ngOnInit(): void {
    this.store.dispatch(SensorsActions.loadSensors({ location: 'home' }));
    this.store.dispatch(ActuatorsActions.loadActuators({ location: 'home' }));
    this.store.dispatch(ReadingsActions.loadReadingsBySensor({ sensorId: '2' }));
    this.store.dispatch(ReadingsActions.loadReadingsBySensor({ sensorId: '3' }));
    this.store.dispatch(ReadingsActions.loadReadingsBySensor({ sensorId: '4' }));
  }

  onLedChange(actuatorId: string, checked: boolean): void {
    const status: ActuatorState['status'] = checked ? 'on' : 'off';
    this.store.dispatch(ActuatorsActions.setActuatorState({ actuatorId, status }));
  }
}
