import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartJsComponent} from './chart-js.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

export const chartJsRoutes: Routes = [
  {
    path: '',
    component: ChartJsComponent,
    data: {
      breadcrumb: 'ChartJS Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(chartJsRoutes),
    SharedModule
  ],
  declarations: [ChartJsComponent]
})
export class ChartJsModule { }
