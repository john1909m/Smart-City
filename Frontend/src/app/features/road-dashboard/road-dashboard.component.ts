import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReadingsActions } from '../../store/actions/readings.actions';
import { SensorsActions } from '../../store/actions/sensors.actions';
import { selectLatestReadings } from '../../store/selectors/readings.selectors';

@Component({
  selector: 'app-road-dashboard',
  templateUrl: './road-dashboard.component.html',
  styleUrl: './road-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RoadDashboardComponent implements OnInit {
  readonly readings$;

  constructor(private readonly store: Store) {
    this.readings$ = this.store.select(selectLatestReadings);
  }

  ngOnInit(): void {
    this.store.dispatch(SensorsActions.loadSensors({ location: 'road' }));
    this.store.dispatch(ReadingsActions.loadLatestReadings({ location: 'road' }));
  }
}
