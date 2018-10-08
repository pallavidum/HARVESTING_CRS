import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LabelBadgeComponent} from './label-badge.component';
import {SharedModule} from '../../../shared/shared.module';

export const LabelBadgesRoutes: Routes = [
  {
    path: '',
    component: LabelBadgeComponent,
    data: {
      breadcrumb: 'Label Badge',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LabelBadgesRoutes),
    SharedModule
  ],
  declarations: [LabelBadgeComponent]
})
export class LabelBadgeModule { }
