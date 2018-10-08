import { appVariables } from './../../../app.constants';
import { Pipe, PipeTransform } from '@angular/core';

/*
 * Changes the case of the first letter of a given number of words in a string.
*/

@Pipe({ name: 'baResourceNameFormatting' })
export class BaResourceNameFormatting implements PipeTransform {
  transform(input: string): string {
    return input.replace(appVariables.resourceNameIdentifier, '');
  }
}
