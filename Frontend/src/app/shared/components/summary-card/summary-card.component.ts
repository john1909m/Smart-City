import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SummaryCardComponent {
  @Input({ required: true }) label = '';
  @Input({ required: true }) value: string | number = 0;
  @Input() accent: 'primary' | 'warn' | 'success' = 'primary';
}
