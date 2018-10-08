import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformScore'
})
export class TransformScorePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (value <= 350) {
      return `<span style="color:'#EF5350'">${value}</span>`
    } else if (value <= 500) {
      return `<span style="color:'#FFD54F'">${value}</span>`
    } else if (value <= 700) {
      return `<span style="color:'#FFC107'">${value}</span>`
    } else {
      return `<span style="color:'#8BC34A'">${value}</span>`
    }
  }

}
