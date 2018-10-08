import { appVariables } from './../../../app.constants';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/*
 * Changes the case of the first letter of a given number of words in a string.
*/

@Pipe({ name: 'baUTCToLocal' })
export class BaUTCToLocal implements PipeTransform {
  transform(input: string): string {
    const localDate = moment(input).local();
    return moment(localDate).format('MMMM Do YYYY, h:mm:ss a');
  }
}
