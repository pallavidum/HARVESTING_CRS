import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {FormValidationComponent} from './form-validation.component';

export const formValidationRoutes: Routes = [
  {
    path: '',
    component: FormValidationComponent,
    data: {
      breadcrumb: 'Form Validation',
      status: true
    }
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(formValidationRoutes),
    SharedModule
  ],
  declarations: [FormValidationComponent]
})
export class FormValidationModule { }
