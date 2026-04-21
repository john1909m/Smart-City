import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReadingsActions } from '../../store/actions/readings.actions';
import { SensorsActions } from '../../store/actions/sensors.actions';
import { selectLatestReadings } from '../../store/selectors/readings.selectors';

@Component({
  selector: 'app-garage-dashboard',
  templateUrl: './garage-dashboard.component.html',
  styleUrl: './garage-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GarageDashboardComponent implements OnInit {
  readonly rfidLogs$;

  constructor(private readonly store: Store) {
    this.rfidLogs$ = this.store.select(selectLatestReadings);
  }

  ngOnInit(): void {
    this.store.dispatch(SensorsActions.loadSensors({ location: 'garage' }));
    this.store.dispatch(ReadingsActions.loadLatestReadings({ location: 'garage' }));
  }
}
