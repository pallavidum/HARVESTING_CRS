import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GenericClassComponent} from './generic-class.component';
import {SharedModule} from '../../../shared/shared.module';

export const GenericClassRoutes: Routes = [
  {
    path: '',
    component: GenericClassComponent,
    data: {
      breadcrumb: 'Generic Class',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GenericClassRoutes),
    SharedModule
  ],
  declarations: [GenericClassComponent]
})
export class GenericClassModule { }
