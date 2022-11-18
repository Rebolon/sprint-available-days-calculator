import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {
  transform(value: number|undefined, ...args: number[]): string {
    if (value === undefined) {
      return "";
    }

    const decimal = args.length ? args[0] : 2;

    return value.toFixed(decimal);
  }
}
