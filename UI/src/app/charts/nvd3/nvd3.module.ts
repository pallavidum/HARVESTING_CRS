import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Nvd3Component} from './nvd3.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

export const nvd3Routes: Routes = [
  {
    path: '',
    component: Nvd3Component,
    data: {
      breadcrumb: 'NVD3 Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(nvd3Routes),
    SharedModule
  ],
  declarations: [Nvd3Component]
})
export class Nvd3Module { }
