import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListChartComponent} from './list-chart.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

export const listChartRoutes: Routes = [
  {
    path: '',
    component: ListChartComponent,
    data: {
      breadcrumb: 'List Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(listChartRoutes),
    SharedModule
  ],
  declarations: [ListChartComponent]
})
export class ListChartModule { }
