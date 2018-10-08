import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../../../theme';
import { appVariables } from './../../../app.constants';

@Pipe({ name: 'baResourceAccess' })
export class BaResourceAccessPipe implements PipeTransform {

  transform(input: string): string {
    let resource = input.split('.')[0];
    const action = input.split('.')[1];
    resource = resource.replace(appVariables.resourceNameIdentifier, '');
    return `${action} ${resource}`;
  }
}
