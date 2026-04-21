import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLabel',
  standalone: false,
})
export class StatusLabelPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/[_-]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
