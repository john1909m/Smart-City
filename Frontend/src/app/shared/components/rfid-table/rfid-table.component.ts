import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RfidEntry } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-rfid-table',
  templateUrl: './rfid-table.component.html',
  styleUrl: './rfid-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RfidTableComponent {
  @Input() rfidLogs: RfidEntry[] = [];

  readonly displayedColumns = ['cardId', 'status', 'type', 'timestamp'];
}