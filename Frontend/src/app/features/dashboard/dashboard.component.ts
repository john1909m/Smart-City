import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { DashboardsActions } from '../../store/actions/dashboards.actions';
import { ReadingsActions } from '../../store/actions/readings.actions';
import { SensorsActions } from '../../store/actions/sensors.actions';
import { selectDashboardByLocation } from '../../store/selectors/dashboards.selectors';
import { selectGlobalSummary } from '../../store/selectors/kpi.selectors';
import { selectLatestReadings } from '../../store/selectors/readings.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DashboardComponent implements OnInit {
  readonly summary$;
  readonly latestReadings$;
  readonly locations$;

  constructor(private readonly store: Store) {
    this.summary$ = this.store.select(selectGlobalSummary);
    this.latestReadings$ = this.store.select(selectLatestReadings);
    this.locations$ = this.store.select(selectDashboardByLocation('all')).pipe(
    map((dashboard) => dashboard?.latestReadings ?? []),
    );
  }

  ngOnInit(): void {
    this.store.dispatch(SensorsActions.loadSensors({}));
    this.store.dispatch(ReadingsActions.loadLatestReadings({}));
    this.store.dispatch(DashboardsActions.loadDashboard({ location: 'all' }));
  }
}
