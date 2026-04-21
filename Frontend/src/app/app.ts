import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly navigation = [
    { label: 'Overview', route: '/dashboard' },
    { label: 'Home', route: '/home' },
    { label: 'Hospital', route: '/hospital' },
    { label: 'Garage', route: '/garage' },
    { label: 'Road', route: '/road' },
  ];
}
