import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdvanceElementsComponent} from './advance-elements.component';
import {SharedModule} from '../../../shared/shared.module';

export const advanceElementRoutes: Routes = [
  {
    path: '',
    component: AdvanceElementsComponent,
    data: {
      breadcrumb: 'Form Elements Advance',
      status: true
    }
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(advanceElementRoutes),
    SharedModule
  ],
  declarations: [AdvanceElementsComponent]
})
export class AdvanceElementsModule { }
