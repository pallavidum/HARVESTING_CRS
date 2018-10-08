import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {SelectComponent} from './select.component';

export const selectRoutes: Routes = [
  {
    path: '',
    component: SelectComponent,
    data: {
      breadcrumb: 'Form Select'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(selectRoutes),
    SharedModule
  ],
  declarations: [SelectComponent]
})
export class SelectModule { }
