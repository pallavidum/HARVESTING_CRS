import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import {RouterModule} from '@angular/router';
import {ChartRoutes} from './charts.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChartRoutes),
    SharedModule
  ],
  declarations: [ChartsComponent]
})
export class ChartsModule { }
