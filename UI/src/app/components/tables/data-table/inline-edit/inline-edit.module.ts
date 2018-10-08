import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import {InlineEditComponent} from './inline-edit.component';

export const inlineEditRoutes: Routes = [
  {
    path: '',
    component: InlineEditComponent,
    data: {
      breadcrumb: 'Editable',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(inlineEditRoutes),
    SharedModule
  ],
  declarations: [InlineEditComponent]
})
export class InlineEditModule { }
