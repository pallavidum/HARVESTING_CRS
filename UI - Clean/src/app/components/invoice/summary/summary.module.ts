import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SummaryComponent} from './summary.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

export const summaryRoutes: Routes = [
  {
    path: '',
    component: SummaryComponent,
    data: {
      breadcrumb: 'Invoice Summary',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(summaryRoutes),
    SharedModule
  ],
  declarations: [SummaryComponent]
})
export class SummaryModule { }
