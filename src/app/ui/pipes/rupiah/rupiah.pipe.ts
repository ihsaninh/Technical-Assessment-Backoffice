import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah',
})
export class RupiahPipe implements PipeTransform {
  transform(value: number): string {
    value = value && value > 0 ? value : 0;

    return `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }

  parse(value: string): string {
    return value
      .toString()
      .split('.')
      .join('')
      .split(',')
      .join('')
      .split(' ')
      .join('')
      .replace('R', '')
      .replace('p', '');
  }
}
