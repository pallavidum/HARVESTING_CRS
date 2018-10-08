import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TdpComponent } from './tdp.component';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from 'angular-highcharts';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChartModule
  ],
  declarations: [TdpComponent]
})
export class TdpModule { }
