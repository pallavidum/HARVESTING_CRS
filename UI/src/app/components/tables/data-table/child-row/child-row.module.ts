import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChildRowComponent} from './child-row.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';

export const childRowRoutes: Routes = [
  {
    path: '',
    component: ChildRowComponent,
    data: {
      breadcrumb: 'Row Details',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRowRoutes),
    SharedModule
  ],
  declarations: [ChildRowComponent]
})
export class ChildRowModule { }
