import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import {BasicComponent} from './basic.component';

export const basicRoutes: Routes = [
  {
    path: '',
    component: BasicComponent,
    data: {
      breadcrumb: 'Basic Table',
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
export class BasicBootstrapModule { }
