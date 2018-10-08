import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AlertComponent} from './alert.component';
import {SharedModule} from '../../../shared/shared.module';

export const AlertRoutes: Routes = [
  {
    path: '',
    component: AlertComponent,
    data: {
      breadcrumb: 'Alert',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AlertRoutes),
    SharedModule
  ],
  declarations: [AlertComponent]
})
export class AlertModule { }
