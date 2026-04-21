import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { SensorReading } from '../../../core/models/sensor-reading.model';

@Component({
  selector: 'app-reading-chart',
  templateUrl: './reading-chart.component.html',
  styleUrl: './reading-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ReadingChartComponent {
  @Input() title = 'Live Readings';
  @Input() readings: SensorReading[] = [];

  get lineChartData(): ChartConfiguration<'line'>['data'] {
    return {
      labels: this.readings.map((reading) => new Date(reading.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: this.title,
          data: this.readings.map((reading) => reading.value),
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
    };
  }

  readonly lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };
}
