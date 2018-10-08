import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from './list.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

export const listRoutes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      breadcrumb: 'Invoice List',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(listRoutes),
    SharedModule
  ],
  declarations: [ListComponent]
})
export class ListInvoiceModule { }
