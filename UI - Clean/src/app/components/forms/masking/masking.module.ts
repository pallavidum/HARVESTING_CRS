import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {MaskingComponent} from './masking.component';

export const maskingRoutes: Routes = [
  {
    path: '',
    component: MaskingComponent,
    data: {
      breadcrumb: 'Form Masking'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(maskingRoutes),
    SharedModule
  ],
  declarations: [MaskingComponent]
})
export class MaskingModule { }
