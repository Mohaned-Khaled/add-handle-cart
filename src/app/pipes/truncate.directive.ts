import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTruncate',
})
export class AppTruncatePipe implements PipeTransform {
  transform(value: string, length: number = 100): string {
    if (value.length <= length) {
      return value;
    } else {
      return value.substr(0, length) + ' ...';
    }
  }
}
