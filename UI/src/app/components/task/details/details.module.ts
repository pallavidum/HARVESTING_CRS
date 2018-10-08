import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailsComponent} from './details.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

export const detailsRoutes: Routes = [
  {
    path: '',
    component: DetailsComponent,
    data: {
      breadcrumb: 'Task Details',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(detailsRoutes),
    SharedModule
  ],
  declarations: [DetailsComponent]
})
export class DetailsModule { }
