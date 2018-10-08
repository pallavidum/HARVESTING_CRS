import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BreadcrumbComponent} from './breadcrumb.component';
import {SharedModule} from '../../../shared/shared.module';

export const BreadcrumbRoutes: Routes = [
  {
    path: '',
    component: BreadcrumbComponent,
    data: {
      breadcrumb: 'Breadcrumb Style',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BreadcrumbRoutes),
    SharedModule
  ],
  declarations: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
