import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasicComponent} from './basic.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

export const basicRoutes: Routes = [
  {
    path: '',
    component: BasicComponent,
    data: {
      breadcrumb: 'Invoice',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(basicRoutes),
    SharedModule
  ],
  declarations: [BasicComponent]
})
export class InvoiceBasicModule { }
