import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReadingsActions } from '../../store/actions/readings.actions';
import { SensorsActions } from '../../store/actions/sensors.actions';
import { selectLatestReadings } from '../../store/selectors/readings.selectors';

@Component({
  selector: 'app-hospital-dashboard',
  templateUrl: './hospital-dashboard.component.html',
  styleUrl: './hospital-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class HospitalDashboardComponent implements OnInit {
  readonly readings$;

  constructor(private readonly store: Store) {
    this.readings$ = this.store.select(selectLatestReadings);
  }

  ngOnInit(): void {
    this.store.dispatch(SensorsActions.loadSensors({ location: 'hospital' }));
    this.store.dispatch(ReadingsActions.loadLatestReadings({ location: 'hospital' }));
  }
}
