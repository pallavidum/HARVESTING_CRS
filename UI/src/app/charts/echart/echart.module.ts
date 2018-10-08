import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EchartComponent} from './echart.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

export const echartRoutes: Routes = [
  {
    path: '',
    component: EchartComponent,
    data: {
      breadcrumb: 'E-Chart Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(echartRoutes),
    SharedModule
  ],
  declarations: [EchartComponent]
})
export class EchartModule { }
