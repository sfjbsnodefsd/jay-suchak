import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value.length > 30) {
      return value.substring(0,30) + '...'
    } else return value
  }

}
